const { concurrent, open, series } = require('nps-utils');

const pause = async () => {
  await new Promise((r) => setTimeout(r, 1000));
};

module.exports = {
  default: 'nps help',
  scripts: {
    lint: {
      script: "prettier --write './**/*.js' './**/*.svelte' './**/*.html'",
      description: 'format all files',
    },
    api: {
      test: {
        default: {
          script: 'pnpm run test --filter ./api',
          description: 'run API unit tests',
        },
        coverage: {
          script: 'pnpm run test.coverage --filter ./api',
          description: 'run API unit tests with coverage',
        },
        only: {
          script: 'pnpm run test.only --filter ./api',
          description: 'run only marked API unit tests',
        },
      },
      build: {
        local: {
          script: 'pnpm run docker.build --filter ./api',
          description: 'build API docker image',
        },
      },
      run: {
        script: 'pnpm run docker.run --filter ./api',
        description: 'run API locally',
      },
      stop: {
        script: 'pnpm run docker.stop --filter ./api',
        description: 'stop API locally',
      },
      deploy: {
        script: series(
          'pnpm run docker.build --filter ./api',
          'pnpm run gcp.build --filter ./api',
          'pnpm run gcp.deploy --filter ./api',
          'firebase deploy'
        ),
        description: 'deploy API to GCP',
      },
    },
    app: {
      run: {
        script: concurrent({
          run: 'pnpm run dev --filter ./app',
          open: series('sleep 1', open('https://localhost:5000/alpha.html')),
        }),
        description: 'run app locally',
      },
      build: {
        script: 'pnpm run build --filter ./app',
        description: 'build app',
      },
      deploy: {
        script: series('pnpm run build --filter ./app', 'firebase deploy'),
        description: 'deploy app to GCP',
      },
    },
  },
  options: {
    silent: true,
  },
};
