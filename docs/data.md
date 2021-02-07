# Data 

```mermaid
erDiagram
  ACCOUNT ||--|| USER: ""
  USER ||--|{ KEY-STORE : ""
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
  KEY-STORE {
    int keystoreId
    string financialModelId
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

### Key Store
* 'no knowledge' encrypted
* holds personal information for model
* **and** financial model id

### Financial Model
* anonymous
* analyzable (therefore SQL?)
* not sure of format yet