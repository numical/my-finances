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
    int keystoreRelationId,
    int keystoreId,
    string type
    string encryptedKey
   }
  KEY-STORE {
    int keystoreId
    int financialModelId
  }
  FINANCIAL-MODEL {
    int id
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