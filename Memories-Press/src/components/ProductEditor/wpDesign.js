// wpDesign.js

const WP_USER = import.meta.env.VITE_WP_USERNAME;
const WP_PASS = import.meta.env.VITE_WP_PASSWORD;
const authHeader = () => 'Basic ' + btoa(`${WP_USER}:${WP_PASS}`);

/**
 * STEP 1 – upload a Blob to WP media
 * Returns: { id, url, hash }
 */
export async function uploadMedia(blob, filename, mime) {
  console.log('🔹 uploadMedia() called with:', { filename, mime, blobSize: blob.size });

  // build form-data
  const form = new FormData();
  form.append('file', blob, filename);

  const url = '/wp-json/wp/v2/media';
  console.log(`🔹 uploadMedia: POST ${url}`);

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: authHeader(),
      Accept: 'application/json',
    },
    body: form,
  });

  console.log('🔹 uploadMedia: status', res.status, res.statusText);
  const text = await res.text();
  if (!res.ok) {
    throw new Error(`media upload failed ${res.status}: ${text}`);
  }

  const json = JSON.parse(text);
  console.log('🔹 uploadMedia: parsed JSON:', json);

  // compute SHA-256 hash of the blob
  const buf = await blob.arrayBuffer();
  const hash = [...new Uint8Array(await crypto.subtle.digest('SHA-256', buf))]
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
  console.log('🔹 uploadMedia: computed hash:', hash);

  return { id: json.id, url: json.source_url, hash };
}

/**
 * STEP 2 – save your custom cart-design payload
 */
export async function saveCartDesign(payload) {
  console.log('🔹 saveCartDesign() called with payload:', payload);

  const url = '/wp-json/mp/v1/cart-design';
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authHeader(),
    },
    body: JSON.stringify(payload),
  });

  const text = await res.text();
  if (!res.ok) {
    throw new Error(`cart-design POST failed ${res.status}: ${text}`);
  }

  return JSON.parse(text);
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

/**
 * STEP 3 – add the product to the Woo cart
 */
export async function addWooItem({ productId, variationId = null, quantity, variation = null }) {
  const nonce = await getStoreNonce();
  const url = '/wp-json/wc/store/v1/cart/add-item';

  const body = {
    id: variationId || productId,
    quantity,
    cart_item_data: { mp_unique: crypto.randomUUID() }
  };

  if (variation) {
    // Convert { attribute_pa_quality: 'matte' } into Woo API format
    body.variation = Object.entries(variation).map(([attr, value]) => ({
      attribute: attr.replace(/^attribute_/, ''), // remove prefix
      value
    }));
  }

  const res = await fetch(url, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'Nonce': nonce
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Woo add-item failed ${res.status}: ${text}`);
  }

  return res.json();
}
