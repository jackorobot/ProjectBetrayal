FROM node:10

WORKDIR /usr/src/app

COPY package.json package-lock.json angular.json ./

RUN npm install

COPY . .

RUN npm run buildprod

EXPOSE 4200

CMD ["npm", "run", "prod"]