FROM node:16

WORKDIR /app/

COPY . .

RUN npm install

RUN node server.mjs &

RUN npm i -g serve 

CMD ["serve"]