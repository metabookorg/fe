FROM node:lts

COPY package.json .

RUN mkdir src && mkdir public

COPY src src/

COPY public public/

RUN npm i

EXPOSE 3000

CMD npm run start
