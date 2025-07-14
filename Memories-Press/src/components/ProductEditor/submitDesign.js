import {
  uploadMedia,
  createDesign,
  saveCartDesign,
  addWooItem
} from './wpDesign';

export async function submitDesign({ previewDataURL, pdfBlob, userData, currentProduct }) {
  // start total timer
  const tTotalStart = performance.now();

  const prayer = userData.proverb === 'CUSTOM'
    ? userData.customProverb
    : userData.proverb.text;

  // — Step 1: fetch thumbnail blob —
  const tFetch = performance.now();
  const thumbBlob = await (await fetch(previewDataURL)).blob();
  console.log(
    `⭐️ fetch→blob: ${(performance.now() - tFetch).toFixed(0)}ms ` +
    `(total ${(performance.now() - tTotalStart).toFixed(0)}ms)`
  );

  // — Step 1b: upload both media in parallel —
  function timedUpload(blob, filename, mime, label) {
    const t0 = performance.now();
    return uploadMedia(blob, filename, mime).then(result => {
      console.log(
        `✅ uploadMedia(${label}): ${(performance.now() - t0).toFixed(0)}ms ` +
        `(total ${(performance.now() - tTotalStart).toFixed(0)}ms)`
      );
      return result;
    });
  }

  const [thumbMedia, printMedia] = await Promise.all([
    timedUpload(thumbBlob, 'thumbnail.png', 'image/png',       'thumbnail'),
    timedUpload(pdfBlob,   'printReady.pdf', 'application/pdf','printReady')
  ]);

  // — Step 2: create designs in parallel —
  function timedCreate(blob, filename, label) {
    const t0 = performance.now();
    return createDesign(blob, filename).then(res => {
      console.log(
        `✅ createDesign(${label}): ${(performance.now() - t0).toFixed(0)}ms ` +
        `(total ${(performance.now() - tTotalStart).toFixed(0)}ms)`
      );
      return res;
    });
  }

  const [{ id: thumbDesignId }, { id: printDesignId }] = await Promise.all([
    timedCreate(thumbBlob, 'thumbnail.png',  'thumbnail-design'),
    timedCreate(pdfBlob,   'printReady.pdf', 'printReady-design')
  ]);

  // — Step 3: save cart design —
  const tSave = performance.now();
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
  console.log(
    `✅ saveCartDesign: ${(performance.now() - tSave).toFixed(0)}ms ` +
    `(total ${(performance.now() - tTotalStart).toFixed(0)}ms)`
  );

  // — Step 4: add WooCommerce item —
  const tWoo = performance.now();
  await addWooItem({
    productId: currentProduct.id,
    quantity:  userData.quantity,
  });
  console.log(
    `✅ addWooItem: ${(performance.now() - tWoo).toFixed(0)}ms ` +
    `(total ${(performance.now() - tTotalStart).toFixed(0)}ms)`
  );

  // final total
  console.log(
    `⚡️ submitDesign completed in ${(performance.now() - tTotalStart).toFixed(0)}ms`
  );
}
