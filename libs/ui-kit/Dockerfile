FROM node:22-alpine AS ui-kit-builder

WORKDIR /app

COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn .yarn
COPY src src
COPY bundler bundler
COPY tsconfig.json vite.config.ts tailwind.config.ts postcss.config.js native.* utils.* ./

RUN yarn && yarn build
