FROM node:14

WORKDIR /usr/src/api

COPY .env.example .env
COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 8080
CMD [ "node", "app.js" ]
