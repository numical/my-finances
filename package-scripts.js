const { concurrent, open, series } = require('nps-utils');

const prun = (s) => `npx pnpm run ${s}`;

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
        'npx pnpm install -r',
        'npx nps local.certs'
      ),
      description: 'reset entire repo',
    },
    build: {
      default: {
        script: concurrent({
          api: 'docker build -t my-finances-api .',
          app: prun('build --filter ./packages/app'),
        }),
        description: 'build App and API docker image',
      },
      api: {
        script: 'docker build -t my-finances-api .',
        description: 'build API docker image',
      },
      app: {
        script: prun('build --filter ./packages/app'),
        description: 'build App',
      },
    },
    deploy: {
      default: {
        script: series(
          'gcloud builds submit --tag gcr.io/my-finances-page/my-finances-api',
          'gcloud beta run deploy my-finances-api --image gcr.io/my-finances-page/my-finances-api --platform managed --allow-unauthenticated --region=europe-west1 --memory=256Mi',
          'firebase deploy'
        ),
        description: 'deploy app and API - build first!',
      },
      app: {
        script: 'firebase deploy',
        description: 'deploy App - build first!',
      },
    },
    local: {
      default: {
        script: concurrent({
          keys:
            'export GOOGLE_APPLICATION_CREDENTIALS="./remote/auth/my-finances-key.json"',
          run: 'node ./local/src/devServer | pino-pretty --hideObject',
          open: series('sleep 1', open('https://localhost:8080/alpha.html')),
        }),
        description: 'run locally',
      },
      certs: {
        script: series(
          'mkdir -p ./local/auth',
          "openssl req -x509 -newkey rsa:2048 -nodes -sha256 -subj '/CN=localhost'   -keyout ./local/auth/localhost-key.pem -out ./local/auth/localhost-cert.pem"
        ),
        description: 'generate local certificates for test servers',
      },
      docker: {
        default: {
          script:
            'docker run -d -p 8080:8080 --name my-finances my-finances-api',
          description: 'run API locally in docker',
        },
        stop: {
          script: 'docker stop my-finances && docker container rm my-finances',
          description: 'stop API running locally in docker',
        },
        interact: {
          script: 'docker run -it my-finances-api /bin/sh',
          description: 'run API docker container shell',
        },
      },
    },
    remote: {
      keys: {
        script:
          'gcloud iam service-accounts keys create ./remote/auth/my-finances-key.json --iam-account=my-finances-page@appspot.gserviceaccount.com',
        description: 'download service account key for GCP service access',
      },
    },
    api: {
      test: {
        default: {
          script: prun('test --filter ./packages/api'),
          description: 'run API unit tests',
        },
        coverage: {
          script: prun('test.coverage --filter ./packages/api'),
          description: 'run API unit tests with coverage',
        },
        only: {
          script: prun('test.only --filter ./packages/api'),
          description: 'run only marked API unit tests',
        },
      },
    },
    app: {
      run: {
        script: concurrent({
          run: prun('dev --filter ./packages/app'),
          open: series('sleep 1', open('https://localhost:5000/alpha.html')),
        }),
        description: 'run app locally',
      },
    },
  },
  options: {
    silent: true,
  },
};
