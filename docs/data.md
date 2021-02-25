# Data

```mermaid
erDiagram
  ACCOUNT ||--o{ USER-ACCOUNT-LINK: holds
  USER ||--o{  USER-ACCOUNT-LINK: holds
  USER-ACCOUNT-LINK ||--o{ KEYSTORE-LINK : owns
  KEYSTORE-LINK }|--|| KEYSTORE : "enables access to"
  KEYSTORE ||--|| FINANCIAL-MODEL : "anonymises"
  ACCOUNT {
    string id
    string email
  }
  USER {
    string id
    string userId
    string pwd
  }
  USER-ACCOUNT-LINK {
    string id
    string accountId
    string userId
    string type
   }
  KEYSTORE-LINK {
    string id
    string userAccountId
    string keystoreId
    string description
    string encryptionKey
    string type
   }
  KEYSTORE {
    string id
    bytes data (incudes financialModel id)
  }
  FINANCIAL-MODEL {
    string id
    bytes data
  }
```

## Account
* the commercial relationship with my-finances
* subscription details

## User
* the runtime user identity
* userId is public hash generated from email, so **can change** 
* pwd is also a hash

## User Account Link
* associates a user with an account
* type - enumeration

## Key Store Link
* associates a user with a keystore
* type - enumeration 'read-only', 'read-write'
* description - encrypted by user
* encryption key for keystore - encrypted by user

## Key Store
* 'no knowledge' encrypted
* holds personal information for model
* **and** financial model id

## Financial Model
* anonymous
* analyzable (therefore SQL?)
* not sure of format yet

# Use Cases
| | Description | Solution |
| --- | --- | --- |
| 1. | private user | userAccountType: 'personal' |
| 2. | individual IFA | userAccountType: 'personal' |
| 3. | group IFA | account only |
| 4. | group IFA member |  userAccountType: 'member' |
| 5. | IFA client | userAccountType: 'client' |
| 6. | private user, gives access to IFA | userAccountType: 'client' |

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

### Firestore Data Structure
**Only Personal** users for now
* `/users` collection
  * `user` doc
    * `account` map
    * `keyStores` array
      * of `keyStore` maps
* `/financialModels` collection
  * `financialModel` doc