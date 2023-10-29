FROM node:21

WORKDIR /usr/app

RUN apt-get update
RUN apt-get install nano
RUN apt-get install curl
RUN npm install --save three
RUN npm install --save-dev vite

COPY index.html /usr/app/index.html
COPY main.js /usr/app/main.js

EXPOSE 5173

CMD ["npx","vite","--host","0.0.0.0"]