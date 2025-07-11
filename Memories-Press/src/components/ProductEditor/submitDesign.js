import {
  uploadMedia,    // uploads to /wp-json/wp/v2/media  → { id, url, hash }
  createDesign,   // sends ONE Blob to /wp-json/mp/v1/design → { id }
  saveCartDesign,  // posts JSON to /wp-json/mp/v1/cart-design
  addWooItem
} from './wpDesign';

export async function submitDesign({ previewDataURL, pdfBlob, userData, currentProduct }) {
  const prayer = userData.proverb === 'CUSTOM' ? userData.customProverb : userData.proverb.text;
  /* ----------  Step 1 – upload to WP media  ---------- */

  // ⬤ thumbnail
  const thumbBlob  = await (await fetch(previewDataURL)).blob();
  const thumbMedia = await uploadMedia(thumbBlob, 'thumbnail.png', 'image/png');   // { id,url,hash }

  // ⬤ print-ready PDF
  const printMedia = await uploadMedia(pdfBlob, 'printReady.pdf', 'application/pdf');

  /* ----------  Step 2 – call /mp/v1/design for EACH image  ---------- */

  // design id for thumbnail
  const { id: thumbDesignId }  = await createDesign(thumbBlob,  'thumbnail.png');

  // design id for printReady
  const { id: printDesignId }  = await createDesign(pdfBlob,   'printReady.pdf');

  /* ----------  Step 3 – /mp/v1/cart-design  ---------- */

  await saveCartDesign({
    name:        userData.name,
    date_birth:  userData.dob,
    date_death:  userData.dod,
    proverb:     prayer, 
    images: {
      thumbnail:  { id: thumbDesignId,  url: thumbMedia.url,  hash: thumbMedia.hash },
      printReady: { id: printDesignId,  url: printMedia.url,  hash: printMedia.hash },
    },
  });

/* ----------  Step 4 – /mp/v1/cart-design  ---------- */

  await addWooItem({
  productId: currentProduct.id,
  quantity:  userData.quantity,
});
}