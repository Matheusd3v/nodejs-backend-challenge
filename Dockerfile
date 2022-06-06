FROM node:16

WORKDIR /app

COPY package*.json ./

RUN yarn install --frozen-lockfile

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.9.0/wait /wait
RUN chmod +x /wait

COPY . .

ENV NODE_PATH=./src