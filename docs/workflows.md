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
1. can run locally in docker through `local` commands
   * `run build.api` 
   * `run local.docker`
   * `run local.docker.stop`
   * `run local.docker.interact` < run shell in docker container
## Working with App
* **no** API
1. dev/test
    * `run app.xxx`

## Working on Both
* TODO: run in dev mode
    * file watch etc.
    * `run dev`
1. build each
    * `run build.api` 
    * `run build app`
1. run locally to manually test
    * `run local`
1. deploy everything to GCP
    * `run deploy`
    
