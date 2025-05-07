FROM node:20

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install

RUN yarn global add serve

COPY . .

EXPOSE 3000

CMD ["yarn", "run", "start"]