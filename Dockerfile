FROM node:20-alpine3.17

WORKDIR /usr/src/app

RUN npm install -g @nestjs/cli

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]
