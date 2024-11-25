FROM node:22-alpine as base
WORKDIR /usr/app/
COPY package*.json tsconfig*.json ./

FROM base as dev
RUN npm install
COPY . .
RUN npm run build

FROM base as prod
RUN npm install --omit=dev

FROM base
COPY --from=dev /usr/app/dist ./dist
COPY --from=dev /usr/app/logs ./logs
COPY --from=dev /usr/app/prisma ./prisma
COPY --from=dev /usr/app/package*.json ./
COPY --from=dev /usr/app/tsconfig*.json ./
COPY --from=dev /usr/app/doc/api.yaml ./doc/api.yaml
COPY --from=prod /usr/app/node_modules  ./node_modules

CMD npm run prisma:generate && npm run prisma:migration:deploy && npm run start:dev