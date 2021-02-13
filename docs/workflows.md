# Workflows

## Project Setup
1. set up GCP project - [remote/scripts/setup-project.sh](../remote/scripts/setup-project.sh)
1. set up Firebase elements
   * manual - see [Firebase Setup](./firebase-setup.md)
1. install [pnpm](https://pnpm.js.org/en/) (assuming node already installed)
    * `npm install -g pnpm`
1. clone project
    * `git clone git@github.com:numical/my-finances.git`
1. add run alias    
    * `cd my-finances`
    * `. run-alias.sh` 
1. project reset
    * `run reset`
1. review available scripts
    * `run`
    
## Working with API
1. develop
1. unit test
    * `run api.test`
    * `run api.test.xxx`
1. build and run docker image
    * `run api.docker.build`
    * `run api.docker.run`
    * `run api.docker stop`
1. use curl scripts etc.
1. deploy **only** API
    * `run api.deploy`

## Working with App
* **no** API
1. dev/test
    * `run app.xxx`
1. prod build
    * `run app.build`
1. deploy **ony** App
    * `run app.deploy`

## Working on Both
* TODO: run in dev mode
    * file watch etc.
    * `run dev`
1. build separately 
2. run locally to manually test
    * `run local`
3. deploy everything to GCP
    * `run deploy`
    
