FROM node:22-alpine

WORKDIR /app
COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn .yarn
COPY apps/client/package.json apps/client/package.json
COPY apps/native/package.json apps/native/package.json
COPY libs/shared-lib/package.json libs/shared-lib/package.json

RUN yarn

COPY tsconfig.base.json tailwind.config.ts palette.ts ./
COPY .git .git

COPY libs/shared-lib libs/shared-lib
RUN yarn workspace @digitask/shared-lib build
