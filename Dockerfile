FROM node:14-alpine

RUN apk --no-cache add curl

ENV PNPM_VERSION 5.17.1
RUN curl -sL https://unpkg.com/@pnpm/self-installer | node

WORKDIR /my-finances-in-docker

COPY pnpm*.yaml ./

COPY packages/api ./packages/api
COPY packages/common ./packages/common

RUN pnpm install -r --frozen-lockfile && rm -rf ~/.pnpm-store;

CMD [ "node", "./packages/api/index.js" ]