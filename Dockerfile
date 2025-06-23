# FROM oven/bun:latest
FROM node:lts-slim
WORKDIR /app
COPY app .
