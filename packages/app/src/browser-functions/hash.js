// thanks https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest#converting_a_digest_to_a_hex_string

const enc = new TextEncoder();

export default async (...s) => {
  const toEncode = s.join(':');
  const msgUint8 = enc.encode(toEncode);
  const hashBuffer = await crypto.subtle.digest('SHA-512', msgUint8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
  return hashHex;
};
