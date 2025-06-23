FROM node:lts-slim
WORKDIR /app
COPY app .
RUN npm install -g pnpm@latest-10