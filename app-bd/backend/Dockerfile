FROM node:18

WORKDIR /home/node/app

COPY ./package*.json ./

RUN npm install yarn

RUN yarn

COPY . .

RUN [ "yarn", "tsc"]

EXPOSE 3333