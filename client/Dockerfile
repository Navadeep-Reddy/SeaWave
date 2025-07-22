FROM node:22-alpine AS build

WORKDIR /app

COPY package.json ./
COPY pnpm-lock.yaml ./

RUN npm install -g pnpm

RUN pnpm install

COPY . .

RUN pnpm build

FROM nginx:1.28-alpine-slim

WORKDIR /usr/share/nginx/html

COPY --from=build /app/dist .

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]






