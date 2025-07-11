import { uploadMedia, createDesign, saveCartDesign } from './wpDesign';

/**
 * Runs Steps 1–3: upload => /design => /cart-design
 */
export async function submitDesign({ productRoute, previewDataURL, pdfBlob, userData }) {
  // 1) uploads
  const thumbBlob   = await (await fetch(previewDataURL)).blob();
  const thumbnail   = await uploadMedia(thumbBlob, 'thumbnail.png',  'image/png');
  const printReady  = await uploadMedia(pdfBlob,  'printReady.pdf', 'application/pdf');

  // 2) /mp/v1/design
  const { id: design_id } = await createDesign(productRoute, { thumbnail, printReady });

  // 3) /mp/v1/cart-design
  await saveCartDesign({
    name:        userData.name,
    date_birth:  userData.dob,
    date_death:  userData.dod,
    quantity:    userData.quantity,
    images:      { thumbnail, printReady },
    design_id,
  });
}
