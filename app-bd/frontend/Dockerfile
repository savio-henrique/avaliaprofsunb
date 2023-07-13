FROM node:18

WORKDIR /app

COPY ./package*.json ./

RUN npm install yarn

RUN yarn

COPY . .

EXPOSE 3000

RUN ["yarn", "start"]