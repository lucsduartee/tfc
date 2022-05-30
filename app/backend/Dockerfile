FROM node:16-alpine

WORKDIR app

COPY package* /app

RUN npm install

COPY . /app

CMD ["npm", "install"]
