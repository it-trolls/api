FROM node:12-alpine

WORKDIR /usr/src/api

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3010

CMD [ "npm", "start" ]