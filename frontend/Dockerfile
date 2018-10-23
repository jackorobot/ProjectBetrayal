FROM node:6

WORKDIR /usr/src/app

COPY package.json package-lock.json .angular-cli.json ./

RUN npm install

COPY . .

RUN npm run buildprod

EXPOSE 4200

CMD ["npm", "run", "prod"]