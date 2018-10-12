FROM node:latest

COPY . /src

WORKDIR /src

RUN npm install --no-bin-links --production

EXPOSE 3000

CMD node src/app.js
