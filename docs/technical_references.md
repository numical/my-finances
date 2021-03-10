# Libraries

## In Use
* client-side cryptographic hashing: browser supplied [SubtleCrypto](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest)
  * alternative: [crypto-js](https://cryptojs.gitbook.io/docs/)
* diagrams [mermaid](https://mermaid-js.github.io/)
* data validation: [AJV](https://www.npmjs.com/package/ajv)
* logging: [Pino](https://github.com/pinojs/pino)
* testing: [tap](https://www.npmjs.com/package/tap)


## Possibilities
* 2FA - [speakeasy](https://www.npmjs.com/package/speakeasy)
* service worker wrapper for cache-first loading - [google workbox](https://developers.google.com/web/tools/workbox)


## Problems
No git hook solution working at the moment with pnpm:
* [pre-commit](https://www.npmjs.com/package/pre-commit)
* [husky](https://www.npmjs.com/package/husky)