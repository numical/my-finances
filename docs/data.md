# Data 

```mermaid
erDiagram
  ACCOUNT ||--|| USER: ""
  USER ||--|{ KEY-STORE-LINK : ""
  ACCOUNT ||--|{ KEY-STORE-LINK : ""
  KEY-STORE-LINK ||--|{ KEY-STORE : ""
  KEY-STORE ||--|| FINANCIAL-MODEL : ""
  ACCOUNT {
    int accountId
  }
  USER {
    string userid
    string pwd
    int accountId
    map[string, int] keystores
  }
  KEY-STORE-LINK {
    int keystoreLinkId,
    int keystoreId,
    string type
    string encryptedKey
   }
  KEY-STORE {
    int keystoreId
    int financialModelId
  }
  FINANCIAL-MODEL {
    int modelId
  }
```

### Account
* subscription details

### User
* userInitial identity
* note that id and pwd are hashes

### Key Store Link
* associates a user and/or an account with a keystore
* includes a type for 'read-only' etc.
* most importantly holds the encryption key for the keystore - encrypted by the user or account

### Key Store
* 'no knowledge' encrypted
* holds personal information for model
* **and** financial model id

### Financial Model
* anonymous
* analyzable (therefore SQL?)
* not sure of format yet

# Database
* account / user / keystore-link / keystore relations need foreign keys
  * structured => SQL
  * but flexibility of no-sql might be good for development  
  * definitely transactional
* financial model needs to be uploaded to BigQuery / whatever analysis engine
* but all db's in GCP relatively pricey
  
## Firestore
* except [Firestore](https://cloud.google.com/firestore)
* pros  
  * generous free tier for runtime
  * also offers synchronisation functionality (real-time updates) - might answer config issues
  * has [security rules](https://cloud.google.com/firestore/docs/security/get-started) for trigger-like functionality  
* cons
  * (almost) no CLI
  * so clunky manual setup - see [setup](./firebase-setup.md)
  * available regions do not match cheapest regions (e.g. europe-west1)  
  * no creation scripts!
* see [Firestore setup](./firestore-setup.md)  



    