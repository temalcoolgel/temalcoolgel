#Stage 1: Build stage
FROM node:8 as build-stage

WORKDIR /app

COPY package*.json /app/

RUN npm install --silent

COPY ./ /app/

RUN npm run build 
# Stage 2, 
FROM node:8-alpine

COPY --from=build-stage /app/dist /dist
COPY --from=build-stage /app/node_modules /node_modules

ENV NODE_ENV=production
ENV PORT=80

CMD node dist/app.js