FROM node:lts-slim

RUN mkdir /usr/src/app

WORKDIR /usr/src/app

COPY ./src/package.json /usr/src/app/package.json
RUN npm install