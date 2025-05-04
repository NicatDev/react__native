FROM node:22-alpine AS ws-client-builder

WORKDIR /app

COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn .yarn
COPY src src
COPY tsconfig.json vite.config.ts ./

RUN yarn && yarn build
