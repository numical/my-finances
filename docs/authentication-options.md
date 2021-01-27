# Authentication Choice
* based on [this advice](https://www.securitydrops.com/the-web-api-authentication-guide/)
## HTTP Basic Auth
* **mechanism**
  * Header: Authorization: Basic base64(username:password)
  * browser caches credentials    
* **pros**
  * simple
* **cons**
  * confidentiality relies on TLS
  * CSRF protection needed
  * replay protection relies on TLS
  * integrity protection relies on TLS  
  * no session management
  * [complex logout](https://stackoverflow.com/questions/233507/how-to-log-out-user-from-web-site-using-basic-authentication)  
    
## HTTP Digest Auth
* **Mechanism**
  * calculate nonce for each request
* **cons**
  * real password known at each end
  * CSRF protection needed as browser does everything
  * browser suport
    
## Cookies
* **Mechanism**
  * a storage mechanism
  * handled by browser
  * set-cookie headers with flags
  * use samesite adn secureflag  
    

## Bearer Tokens
* **mechanism**
  * Authorization: Bearer ujoomieHe2ZahC5b
  * a cryptographically signed token  
  * use with sessions possibly?   
* **pros**
  * excellent CSRF as browser does not do it
* **cons**
  * jwt specifically
    * cannot invalidate/update stateless JWT's
    * size/security issues dependent on where stored
    * still headers
   
## Signature Schemes
* **Mechanism**
  * pre-signed URL?
    
## TLS Client Certificates
* **Mechanism**
  * need to control server TLS termination, so out of the question
    
    

| Scheme | Complexity | Confidentiality | CSRF Protection | Replay Protection | Integrity Protection | Session | Log Out |
| --- | --- | --- | --- | --- | --- | --- | --- |
| HTTP Basic Auth | + | X  | X | X | X | X | X |
| HTTP  Digest Auth | X | X | X | + | + | X | X |
| Cookies |  + | X | + (same site) | X | X | + | X |
| Bearer Tokens | + | X | ++ | X | X | (+X) | X |
| Signature Schemes | | | |
| TLS Client Certificates| | | |
| HMAC | | | |


# Login
## Using Identity Platform
* simplest
* **but** password known to Identity Service
```mermaid
sequenceDiagram
    autonumber
    User->>+App: email/pwd
    App->>Identity API: auth(email, pwd)
    Identity API->>App: token
    App->>My Finances API: GET /pfm/:id [token]
    My Finances API->>Cloud Datastore: get(id)
    Cloud Datastore->>App: encrypted personal finances model  
    App->>App:decrypt(model, pwd)
    App->>-User: UI
```

## No Knowledge

```mermaid
sequenceDiagram
    autonumber
    User->>+App: email/pwd
    App->>App: hash(email+pwd)
    App->>API: GET /pfm(email, hash)
    App->>-User: display UI
```
# Registration