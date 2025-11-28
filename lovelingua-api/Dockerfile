FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci --omit=dev

COPY dist ./dist

VOLUME ["/usr/src/app/data"]

ENV SQLITE_PATH=/usr/src/app/data/lovelingua.sqlite

CMD ["node", "dist/server.js"]
