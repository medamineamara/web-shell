FROM node:16

WORKDIR /app/

COPY . .

RUN npm install


RUN npm i -g serve


CMD ["sh", "-c", "npm start & serve"]