// submitDesign.js

import {
  uploadMedia,
  saveCartDesign,
  addWooItem
} from './wpDesign';

export async function submitDesign({ previewDataURL, pdfBlob, userData, currentProduct }) {
  // total timer
  const tTotalStart = performance.now();

  const prayer = userData.proverb === 'CUSTOM'
    ? userData.customProverb
    : userData.proverb.text;

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
    timedUpload(thumbBlob, 'thumbnail.png',   'image/png',       'thumbnail'),
    timedUpload(pdfBlob,   'printReady.pdf',  'application/pdf', 'printReady'),
  ]);

  // Step 2 (now dropped — no createDesign call)

  // Step 3: save cart design
  const tSave = performance.now();
  await saveCartDesign({
    name:        userData.name,
    date_birth:  userData.dob,
    date_death:  userData.dod,
    proverb:     prayer,
    images: {
      thumbnail:  { id: thumbMedia.id,   url: thumbMedia.url,   hash: thumbMedia.hash },
      printReady: { id: printMedia.id,   url: printMedia.url,   hash: printMedia.hash },
    },
  });
  console.log(
    `✅ saveCartDesign: ${(performance.now() - tSave).toFixed(0)}ms ` +
    `(total ${(performance.now() - tTotalStart).toFixed(0)}ms)`
  );

  // Step 4: add Woo item
  const tWoo = performance.now();
  await addWooItem({
    productId: currentProduct.id,
    quantity:  userData.quantity,
  });
  console.log(
    `✅ addWooItem: ${(performance.now() - tWoo).toFixed(0)}ms ` +
    `(total ${(performance.now() - tTotalStart).toFixed(0)}ms)`
  );

  // Final total
  console.log(
    `⚡️ submitDesign completed in ${(performance.now() - tTotalStart).toFixed(0)}ms`
  );
}