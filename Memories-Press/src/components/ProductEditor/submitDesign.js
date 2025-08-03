import {
  uploadMedia,
  saveCartDesign,
  addWooItem
} from './wpDesign';

export async function submitDesign({ previewDataURL, pdfBlob, userData, currentProduct }) {
  const tTotalStart = performance.now();

  const proverbName =
    userData.proverb === 'CUSTOM'
      ? 'Custom'
      : (userData.proverb && userData.proverb.name) ? userData.proverb.name : '';

  const proverbText =
    userData.proverb === 'CUSTOM'
      ? userData.customProverb
      : (userData.proverb && userData.proverb.text) ? userData.proverb.text : '';

  // Step 1: fetch thumbnail Blob
  const tFetch = performance.now();
  const thumbBlob = await (await fetch(previewDataURL)).blob();
  console.log(
    `⭐️ fetch→blob: ${(performance.now() - tFetch).toFixed(0)}ms ` +
    `(total ${(performance.now() - tTotalStart).toFixed(0)}ms)`
  );

  // Step 1b: upload both media in parallel
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
    timedUpload(thumbBlob, 'thumbnail.png', 'image/png', 'thumbnail'),
    timedUpload(pdfBlob, 'printReady.pdf', 'application/pdf', 'printReady'),
  ]);

  // Step 3: save cart design
  const tSave = performance.now();
  await saveCartDesign({
    name: userData.name,
    date_birth: userData.dob,
    date_death: userData.dod,
    proverb_name: proverbName,
    proverb_text: proverbText,
    images: {
      thumbnail: { id: thumbMedia.id, url: thumbMedia.url, hash: thumbMedia.hash },
      printReady: { id: printMedia.id, url: printMedia.url, hash: printMedia.hash },
    },
  });
  console.log(
    `✅ saveCartDesign: ${(performance.now() - tSave).toFixed(0)}ms ` +
    `(total ${(performance.now() - tTotalStart).toFixed(0)}ms)`
  );

  // Step 4: Add WooCommerce item
  const tWoo = performance.now();

  let variationId = null;
  let variationObj = null;

  if (Array.isArray(currentProduct.prices)) {
    const matchedPrice = currentProduct.prices.find(p => p.option === userData.finish);
    if (matchedPrice) {
      variationId = matchedPrice.id;
      variationObj = {
        attribute_pa_quality: userData.finish.toLowerCase().replace(/\s+/g, '-') // convert to slug
      };
    }
  }

  await addWooItem({
    productId: currentProduct.id,
    variationId,
    quantity: userData.quantity,
    variation: variationObj
  });

  console.log(
    `✅ addWooItem: ${(performance.now() - tWoo).toFixed(0)}ms ` +
    `(total ${(performance.now() - tTotalStart).toFixed(0)}ms)`
  );

  console.log(
    `⚡️ submitDesign completed in ${(performance.now() - tTotalStart).toFixed(0)}ms`
  );
}

