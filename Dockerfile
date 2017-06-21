FROM node:7.7.1

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/
RUN yarn install

COPY . /usr/src/app
RUN yarn run build

EXPOSE 3000

CMD [ "npm", "run", "start:server" ]