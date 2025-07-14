const WP_USER = import.meta.env.VITE_WP_USERNAME;
const WP_PASS = import.meta.env.VITE_WP_PASSWORD;
const authHeader = () => 'Basic ' + btoa(`${WP_USER}:${WP_PASS}`);
const isDev = import.meta.env.VITE

/** STEP 1 – upload a file to the WP media library */
export async function uploadMedia(blob, filename, mime) {
  // Build multipart/form-data
  const form = new FormData();
  form.append('file', blob, filename);          // 🔹 key MUST be "file"

  const r = await fetch('/wp-json/mp/v1/design', {
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


/** STEP 2 – upload a single image to /mp/v1/design      *
 *  Expects multipart form-data with key "file".         */
export async function createDesign(fileBlob, filename = 'design.png') {
  const form = new FormData();
  form.append('file', fileBlob, filename);   // fileBlob must be Blob/File

  const r = await fetch('/wp-json/mp/v1/design', {
    method: 'POST',
    headers: { Authorization: authHeader() },
    body: form,
  });

  if (!r.ok) {
    const msg = await r.text();
    throw new Error(`design POST failed ${r.status} – ${msg}`);
  }
  return await r.json();
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

async function getStoreNonce() {
  if (window.wcStoreApiNonce) return window.wcStoreApiNonce;

  // hit the public cart endpoint → WP echoes a new nonce in the headers
  const r = await fetch('/wp-json/wc/store/v1/cart', { credentials: 'include' });
  const nonce = r.headers.get('X-WC-Store-API-Nonce');
  if (!nonce) throw new Error('Could not obtain Store-API nonce');
  return nonce;
}

/** Step 4 – add the product to the Woo cart */
export async function addWooItem({ productId, quantity }) {
  const nonce = await getStoreNonce();

  const res = await fetch('/wp-json/wc/store/v1/cart/add-item', {
    method: 'POST',
    credentials: 'include',                 // keep the WP session
    headers: {
      'Content-Type': 'application/json',
      'X-WC-Store-API-Nonce': nonce,        // ← header WP expects
    },
    body: JSON.stringify({
      id:        productId,                 // currentProduct.id
      quantity,                            // userData.quantity
      cart_item_data: { mp_unique: crypto.randomUUID() },
    }),
  });

  if (!res.ok) {
    const msg = await res.text();
    throw new Error(`Woo add-item failed ${res.status} – ${msg}`);
  }
  return await res.json();                 // cart line-item object
}
