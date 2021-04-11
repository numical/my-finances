const { concurrent, open, series } = require('nps-utils');

const GOOGLE_CREDS = `GOOGLE_APPLICATION_CREDENTIALS="../../remote/auth/my-finances-key.json"`;

const apiScript = ({ script, logLevel = 'error', dataSource = 'memory' }) => {
  const googleCreds = dataSource === 'firestore' ? GOOGLE_CREDS : '';
  return `${googleCreds} DATASOURCE=${dataSource} LOG_LEVEL=${logLevel} pnpm run ${script} --filter ./packages/api`;
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
        'git config core.hooksPath ./local/githooks/',
        'pnpm install -r',
        'nps local.certs'
      ),
      description: 'reset entire repo',
    },
    build: {
      default: {
        script: concurrent({
          api: 'docker build -t my-finances-api .',
          app: 'pnpm run build --filter ./packages/app',
        }),
        description: 'build App and API docker image',
      },
      api: {
        script: 'docker build -t my-finances-api .',
        description: 'build API docker image',
      },
      app: {
        script: 'pnpm run build --filter ./packages/app',
        description: 'build App',
      },
      outdated: {
        script: 'pnpm -r outdated',
        description: 'list outdated dependencies',
      },
      update: {
        script: 'pnpm -r update',
        description: 'update dependencies',
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
          run: 'node ./local/src/devServer | pino-pretty --hideObject',
          open: series('sleep 1', open('https://localhost:8080/alpha.html')),
        }),
        description: 'run locally',
      },
      gcp: {
        script: concurrent({
          run:
            'GOOGLE_APPLICATION_CREDENTIALS="./remote/auth/my-finances-key.json" node ./local/src/devServer firestore | pino-pretty --hideObject',
          open: series('sleep 1', open('https://localhost:8080/alpha.html')),
        }),
        description: 'run locally, connecting to firestore',
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
      delete: {
        db: {
          script:
            'firebase firestore:delete --recursive --all-collections --yes',
          description: 'clear the entire database',
        },
      },
      update: {
        db: {
          indexes: {
            script: 'firebase deploy --only firestore:indexes',
            description: 'update firestore index exclusions',
          },
        },
      },
      create: {
        superuser: {
          script: apiScript({
            script: 'create.superuser',
            dataSource: 'firestore',
          }),
          description: 'create superuser on database',
        },
        personal: {
          account: {
            script: apiScript({
              script: 'create.personal.account',
              dataSource: 'firestore',
            }),
            description: `create default 'personal' account on database`,
          },
        },
      },
    },
    api: {
      test: {
        default: {
          script: apiScript({ script: 'test' }),
          description: 'run API unit tests',
        },
        debug: {
          default: {
            script: apiScript({ script: 'test', logLevel: 'debug' }),
            description: 'run API unit tests with all details logged',
          },
          gcp: {
            script: apiScript({
              script: 'test',
              loglevel: 'debug',
              datasource: 'firestore',
            }),
            description:
              'run API unit tests against GCP with all details logged',
          },
        },
        gcp: {
          script: apiScript({
            script: 'test',
            loglevel: 'error',
            datasource: 'firestore',
          }),
          description: 'run API unit tests against GCP',
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
    },
    app: {
      run: {
        script: concurrent({
          run: 'pnpm run dev --filter ./packages/app',
          open: series('sleep 1', open('https://localhost:5000/alpha.html')),
        }),
        description: 'run app locally',
      },
    },
    common: {
      test: {
        script: 'pnpm run test --filter ./packages/common',
        description: 'run unit tests for common code',
      },
    },
  },
  options: {
    silent: true,
  },
};
