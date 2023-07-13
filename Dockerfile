FROM node:18

WORKDIR /home/node/app

COPY ./app-bd/backend/package*.json ./

RUN npm install yarn

RUN yarn

COPY ./app-bd/backend/ .

RUN [ "yarn", "tsc"]

EXPOSE 3333