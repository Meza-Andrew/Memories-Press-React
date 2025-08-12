const PROXY_URL = 'http://localhost:8010/proxy/';
const IS_DEV = import.meta.env.DEV;

export default function toProxiedUrl(fullUrl) {
  if (!fullUrl) return '';

  if (!IS_DEV) {
    return fullUrl;
  }
  try {
    const u = new URL(fullUrl);
    return PROXY_URL + u.pathname + u.search;
  } catch {
    return fullUrl;
  }
}