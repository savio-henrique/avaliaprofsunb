FROM node:18

WORKDIR /usr/src/app

# Install app dependencies
COPY ./package.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --omit=dev

# Bundle app source

COPY . .

EXPOSE 3000

CMD [ "npm" , "run" , "start" ]

# if for production
# CMD [ "npm" , "run" , "build" ]

# CMD [ "npm" , "run", "start" ]