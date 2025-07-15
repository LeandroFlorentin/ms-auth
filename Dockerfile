FROM node:22.16.0-alpine AS prod-depencies
WORKDIR /app
COPY package.json ./
RUN npm install --legacy-peer-deps

FROM node:22.16.0-alpine AS prod-builder
WORKDIR /app
COPY package.json ./
COPY --from=prod-depencies /app/node_modules ./node_modules
COPY . ./
RUN npm run build:prod

FROM node:22.16.0-alpine AS run-prod
WORKDIR /app
EXPOSE 3000
COPY --from=prod-depencies /app/node_modules ./node_modules
COPY --from=prod-depencies /app/package.json ./package.json
COPY --from=prod-builder /app/dist ./dist
CMD ["npm","start"]

