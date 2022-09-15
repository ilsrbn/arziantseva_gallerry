FROM node:16-alpine as builder

WORKDIR /app

COPY . .

RUN npm install \
  --production=false

RUN npm run generate

RUN rm -rf node_modules && \
  NODE_ENV=production npm install \
  --production=true

FROM node:16-alpine

WORKDIR /app

COPY --from=builder /app  .

ENV HOST 0.0.0.0
EXPOSE 3000

CMD [ "npm", "run", "start" ]
