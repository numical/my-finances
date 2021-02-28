# Stateless Server Interactions

# Create User
* user created on server with:
    * hashed email as userId
    * hashed password salted with email as pwd
* hence
    * from an auth perspective, server never knows email
    * server nevers know password
    
```mermaid
sequenceDiagram
  autonumber
  User->>App: email/password
  activate App
  App->>App: userId = hash(email)
  App->>App: pwd = hash(email+password)
  App->>API: POST /users { userId, pwd, user details }
  activate API
  API->>API: generate server id
  API->>Datastore: set(id, { ... })
  activate Datastore
  Datastore->>API: { user }
  deactivate Datastore
  API ->>App: { user }
  deactivate API
```  


# Create Session
* definition of _session_:
  * a **time limited** window of validity for cookies and tokens
  * a user might require multiple sessions during any one usage of the app
  * the client is responsible for creating a new session before the current one expires
* user authenticated
* once authenticated, the user identity plays no further part in the session management

```mermaid
sequenceDiagram
  autonumber
  User->>App: email/password
  activate App
  App->>App: pwd = hash(email+password)
  App->>App: id = hash(email)
  App->>API: POST /sessions { id, pwd }
  activate API
  API->>Datastore: get(id)
  activate Datastore
  Datastore->>API: { pwd }
  deactivate Datastore
  API->>API: authenticate
  API->>API: sessionId = guid()
  API->>API: generate JWT token (secret, sessionId, timeout ) 
  API->>API: set cookie containing token
  API->>App: 200 : { sessionId, timeout } [HttpOnly cookie: token]
  deactivate API
  deactivate App
```

# Enforce Session
* browser passes HttpOnly Strict SameSite cookie containing JWT token
* client passes custom header with sessionId
* server checks:
  * cookie present
  * cookie not expired
  * JWT can be decrypted
  * JWT not expired 
  * custom header present  
  * JWT payload matches custom header
    
```mermaid
sequenceDiagram
  autonumber
  App->>API: GET/POST { entityId } [HttpOnly cookie: token] [custom header]
  activate App
  activate API
  API->>API: server checks (see above)
  alt checks pass
  API->>Datastore: get(entityId)
  activate Datastore
  Datastore->>API: { entity }
  activate Datastore
  API->>App: 200 { data } [token]
  else checks fail
  API->>App: 403
  deactivate API
  App->>App: repeat steps 3 to 7
  App->>API: GET/POST { new guid } [HttpOnly cookie: token]
  deactivate App
  end
```
