FROM node:16-alpine

RUN apk --no-cache add curl

ENV PNPM_VERSION 6.2.5
RUN curl -sL https://unpkg.com/@pnpm/self-installer | node

WORKDIR /my-finances-in-docker

COPY pnpm*.yaml ./

COPY packages/api ./packages/api
COPY packages/common ./packages/common

RUN pnpm install -r --frozen-lockfile && rm -rf ~/.pnpm-store;

CMD [ "node", "./packages/api/index.mjs" ]