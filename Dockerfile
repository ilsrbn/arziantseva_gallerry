FROM node:16-alpine as builder

WORKDIR /app

COPY . .

RUN npm ci

FROM node:16-alpine

WORKDIR /app

COPY --from=builder /app  .

ENV HOST 0.0.0.0
EXPOSE 3000

CMD [ "npm", "run", "dev" ]
