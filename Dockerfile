FROM node:alpine

WORKDIR /usr/app

COPY package.json package-lock.json .

RUN npm install

COPY --chown=node:node . .

USER node

EXPOSE 3000

CMD ["npm", "start"]