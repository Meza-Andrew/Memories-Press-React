const WP_USER = import.meta.env.VITE_WP_USERNAME;
const WP_PASS = import.meta.env.VITE_WP_PASSWORD;
const authHeader = () => 'Basic ' + btoa(`${WP_USER}:${WP_PASS}`);
const isDev = import.meta.env.VITE;

/** STEP 1 – upload a file to the WP media library */
export async function uploadMedia(blob, filename, mime) {
  console.log('🔹 uploadMedia() called with:', { filename, mime, blobSize: blob.size });

  // Build multipart/form-data
  const form = new FormData();
  form.append('file', blob, filename);          // key MUST be "file"
  console.log('🔹 uploadMedia: FormData entries:', Array.from(form.entries()).map(([k, v]) => k));

  const url = '/wp-json/wp/v2/media';
  console.log(`🔹 uploadMedia: POST ${url}`);

  const r = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: authHeader(),             // no Content-Type here—fetch sets the boundary
      Accept: 'application/json',
    },
    body: form,
  });

  console.log('🔹 uploadMedia: response status:', r.status, r.statusText);
  const text = await r.text();

  if (!r.ok) {
    throw new Error(`media upload failed ${r.status}: ${text}`);
  }

  let json;
  try {
    json = JSON.parse(text);
  } catch (e) {
    console.error('🔹 uploadMedia: JSON.parse error', e);
    throw e;
  }
  console.log('🔹 uploadMedia: parsed JSON:', json);

  // Optional SHA-256 “hash”
  const buf  = await blob.arrayBuffer();
  const hash = [...new Uint8Array(await crypto.subtle.digest('SHA-256', buf))]
                 .map(b => b.toString(16).padStart(2, '0')).join('');
  console.log('🔹 uploadMedia: computed hash:', hash);

  return { id: json.id, url: json.source_url, hash };
}


/** STEP 2 – create a design entry */
export async function createDesign(fileBlob, filename = 'design.png') {
  console.log('🔹 createDesign() called with:', { filename, blobSize: fileBlob.size });

  const form = new FormData();
  form.append('file', fileBlob, filename);
  console.log('🔹 createDesign: FormData entries:', Array.from(form.entries()).map(([k, v]) => k));

  const url = '/wp-json/mp/v1/design';
  console.log(`🔹 createDesign: POST ${url}`);

  const r = await fetch(url, {
    method: 'POST',
    headers: { Authorization: authHeader() },
    body: form,
  });

  console.log('🔹 createDesign: response status:', r.status, r.statusText);
  const text = await r.text();

  if (!r.ok) {
    throw new Error(`design POST failed ${r.status}: ${text}`);
  }

  let json;
  try {
    json = JSON.parse(text);
  } catch (e) {
    console.error('🔹 createDesign: JSON.parse error', e);
    throw e;
  }
  console.log('🔹 createDesign: parsed JSON:', json);

  return json;
}


/** STEP 3 – POST /mp/v1/cart-design */
export async function saveCartDesign(payload) {
  console.log('🔹 saveCartDesign() called with payload:', payload);

  const url = '/wp-json/mp/v1/cart-design';
  console.log(`🔹 saveCartDesign: POST ${url}`);

  const r = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: authHeader() },
    body: JSON.stringify(payload),
  });

  console.log('🔹 saveCartDesign: response status:', r.status, r.statusText);
  const text = await r.text();

  if (!r.ok) {
    throw new Error(`cart-design POST failed ${r.status}: ${text}`);
  }

  const json = JSON.parse(text);
  console.log('🔹 saveCartDesign: parsed JSON:', json);
  return json;
}


async function getStoreNonce() {
  if (window.wcStoreApiNonce) return window.wcStoreApiNonce;

  console.log('🔹 getStoreNonce: fetching new nonce');
  const r = await fetch('/wp-json/wc/store/v1/cart', { credentials: 'include' });
  const nonce = r.headers.get('X-WC-Store-API-Nonce');
  console.log('🔹 getStoreNonce: received nonce:', nonce);

  if (!nonce) throw new Error('Could not obtain Store-API nonce');
  return nonce;
}


/** Step 4 – add the product to the Woo cart */
export async function addWooItem({ productId, quantity }) {
  console.log('🔹 addWooItem() called with:', { productId, quantity });
  const nonce = await getStoreNonce();
  console.log('🔹 addWooItem: using nonce:', nonce);

  const url = '/wp-json/wc/store/v1/cart/add-item';
  console.log(`🔹 addWooItem: POST ${url}`);

  const body = { id: productId, quantity, cart_item_data: { mp_unique: crypto.randomUUID() } };
  console.log('🔹 addWooItem: request body:', body);

  const res = await fetch(url, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'X-WC-Store-API-Nonce': nonce,
    },
    body: JSON.stringify(body),
  });

  console.log('🔹 addWooItem: response status:', res.status, res.statusText);
  const text = await res.text();

  if (!res.ok) {
    throw new Error(`Woo add-item failed ${res.status}: ${text}`);
  }

  const json = JSON.parse(text);
  console.log('🔹 addWooItem: parsed JSON:', json);
  return json;
}
