FROM node:16-alpine As build

WORKDIR /app

COPY --chown=node:node package*.json ./

RUN npm ci --force

COPY --chown=node:node . .

RUN npm run build

USER node

FROM node:16-alpine AS Prod

ENV PORT=3000

COPY --chown=node:node package*.json ./
RUN npm ci --force --omit=dev
COPY --chown=node:node --from=build /app/dist ./dist

EXPOSE 3000
CMD [ "node", "dist/main.js" ]