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
    reset: {
      script: series(
        'git clean -dfx',
        'pnpm install -r',
        'pnpm start local.certs'
      ),
      description: 'reset entire repo',
    },
    deploy: {
      script: series(
        'pnpm run build --filter ./packages/app',
        'pnpm run docker.build --filter ./packages/api',
        'pnpm run gcp.build --filter ./packages/api',
        'pnpm run gcp.deploy --filter ./packages/api',
        'firebase deploy'
      ),
      description: 'build and deploy app and API'
    },
    api: {
      test: {
        default: {
          script: 'pnpm run test --filter ./packages/api',
          description: 'run API unit tests',
        },
        coverage: {
          script: 'pnpm run test.coverage --filter ./packages/api',
          description: 'run API unit tests with coverage',
        },
        only: {
          script: 'pnpm run test.only --filter ./packages/api',
          description: 'run only marked API unit tests',
        },
      },
      docker: {
        build: {
          script: 'pnpm run docker.build --filter ./packages/api',
          description: 'build API docker image',
        },
        run: {
          script: 'pnpm run docker.run --filter ./packages/api',
          description: 'run API locally',
        },
        stop: {
          script: 'pnpm run docker.stop --filter ./packages/api',
          description: 'stop API locally',
        },
      },
      deploy: {
        script: series(
          'pnpm run docker.build --filter ./packages/api',
          'pnpm run gcp.build --filter ./packages/api',
          'pnpm run gcp.deploy --filter ./packages/api',
          'firebase deploy'
        ),
        description: 'deploy API to GCP',
      },
    },
    app: {
      run: {
        script: concurrent({
          run: 'pnpm run dev --filter ./packages/app',
          open: series('sleep 1', open('https://localhost:5000/alpha.html')),
        }),
        description: 'run app locally',
      },
      build: {
        script: 'pnpm run build --filter ./packages/app',
        description: 'remote app',
      },
      deploy: {
        script: series('pnpm run build --filter ./packages/app', 'firebase deploy'),
        description: 'deploy app to GCP',
      },
    },
    local: {
      default: {
        script: concurrent({
          run: 'node ./local/src/devServer | pino-pretty  --hideObject',
          open: series('sleep 1', open('https://localhost:8080/alpha.html')),
        }),
        description: 'run locally',
      },
      certs: {
        script: series(
          'mkdir -p ./local/certs',
          "openssl req -x509 -newkey rsa:2048 -nodes -sha256 -subj '/CN=localhost'   -keyout ./local/certs/localhost-key.pem -out ./local/certs/localhost-cert.pem"
        ),
        description: 'generate local certificates for test servers',
      },
    },
  },
  options: {
    silent: true,
  },
};
