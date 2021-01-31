## Libraries
* cryptographic hashing for client-side password hashing
    * [crypto-js](https://cryptojs.gitbook.io/docs/)
    * or use browser provided [SubtleCrypto](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest) - this is better as can encrypt/decrypt too
    * note: remember to salt encrypted string
* 2FA
    * [speakeasy](https://www.npmjs.com/package/speakeasy)
* service worker wrapper for cache-first loading - [google workbox](https://developers.google.com/web/tools/workbox)
