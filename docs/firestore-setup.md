# Firestore Setup
* have to use console
* native mode / multi-region (eur) as no europe-west1 option
* Is there a useable CLI?
  * https://cloud.google.com/firestore/docs/reference/rest/


## Collections / Fields

### Indexed
| Accounts | Users | KeystoreLinks | Keystores | FinancialModels | TYPE | 
| --- | --- | ---- | ---- | ---- | --- | 
| id | id | id | id | id | auto-generated string |
| | accountId | accountId (*) | | | reference |
| | | userId (*)|  | | reference |
| | | keystoreId | | | reference |
| type | type | type | | | enum string|
| status | status | status | | | enum string|
(*): either/or

### Non-Indexed Meta
| Accounts | Users | KeystoreLinks | Keystores | FinancialModels | TYPE |
| --- | --- | ---- | ---- | ---- | --- |
| version | version | version | version | version | number |
| created | created | created | created | created | timestamp |

### Not Indexed
| Accounts | Users | KeystoreLinks | Keystores | FinancialModels | TYPE |
| --- | --- | ---- | ---- | ---- | --- |
| email | | | | | string |
| | password | | | | string |
| | | | data | | |
| | | | | data | |

### Enumerations
* currently pretty minimal

| Field | Values |
| --- | --- |
| Accounts.type | user |
| Account.status | active |
| Users.type | test |
| Users.status | active |
| KeystoreLinks.type | read-write |
| KeystoreLinks.status | active |

## Setup Spike
* using UI console - painful!
* CLI limited to:
  * `firebase firestore delete`
  * `firebase firestore indexes` - [can use JSON file](https://firebase.google.com/docs/reference/firestore/indexes)
* some options available via `firebase.json`:
  ```json
  "firestore": {
    "rules": "firestore.rules",
    "indexes": "firestore.indexes.json"
  },

*  but what about initial setup?