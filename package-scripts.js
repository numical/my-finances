const { series } = require('nps-utils');

module.exports = {
  default: "nps help",
  scripts: {
    api: {
      build: {
        local: {
          script: "pnpm run docker.build --filter ./api",
          description: "build API docker image"
        }
      },
      run: {
        script: "pnpm run docker.run --filter ./api",
        description: 'run API locally'
      },
      stop: {
        script: "pnpm run docker.stop --filter ./api",
        description: 'stop API locally'
      },
      deploy: {
        script: series(
          "pnpm run gcp.build --filter ./api",
          "pnpm run gcp.deploy --filter ./api",
          "firebase deploy"
        ),
        description: "deploy API to GCP"
      }
    },
    website: {
      deploy: {
        script: "firebase deploy",
        description: "deploy static content"
      }
    }
  },
  options: {
    silent: true
  }
};