const WP_USER = import.meta.env.VITE_WP_USERNAME;
const WP_PASS = import.meta.env.VITE_WP_PASSWORD;
const authHeader = () => 'Basic ' + btoa(`${WP_USER}:${WP_PASS}`);

/** STEP 1 – upload a file to the WP media library */
export async function uploadMedia(blob, filename, mime) {
  // Build multipart/form-data
  const form = new FormData();
  form.append('file', blob, filename);          // 🔹 key MUST be "file"

  const r = await fetch('/wp-json/wp/v2/media', {
    method: 'POST',
    headers: {
      Authorization: authHeader(),             // no Content-Type here—fetch sets the boundary
      Accept: 'application/json',
    },
    body: form,
  });

  if (!r.ok) throw new Error(`media upload failed ${r.status}`);
  const json = await r.json();

  // Optional SHA-256 “hash”
  const buf  = await blob.arrayBuffer();
  const hash = [...new Uint8Array(await crypto.subtle.digest('SHA-256', buf))]
                 .map(b => b.toString(16).padStart(2, '0')).join('');

  return { id: json.id, url: json.source_url, hash };
}


/** STEP 2 – POST /mp/v1/design */
export async function createDesign(productType, images) {
  const r = await fetch('/wp-json/mp/v1/media', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: authHeader() },
    body: JSON.stringify({ product: productType, images }),
  });
  if (!r.ok) throw new Error(`design POST failed ${r.status}`);
  return await r.json(); // expects { id }
}

/** STEP 3 – POST /mp/v1/cart-design */
export async function saveCartDesign(payload) {
  const r = await fetch('/wp-json/mp/v1/cart-design', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: authHeader() },
    body: JSON.stringify(payload),
  });
  if (!r.ok) throw new Error(`cart-design POST failed ${r.status}`);
  return await r.json();
}
