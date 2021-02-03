const enc = new TextEncoder();
const dec = new TextDecoder();

export default async (...s) => {
  const toEncode = s.join(':');
  const toHash = enc.encode(toEncode);
  const toDecode = await crypto.subtle.digest('SHA-512', toHash);
  return dec.decode(toDecode);
};
