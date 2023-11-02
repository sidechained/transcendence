FROM node:21

WORKDIR /usr/app

RUN apt-get update
RUN apt-get install nano
RUN apt-get install curl
RUN npm install --save three
RUN npm install --save-dev vite

COPY index.html /usr/app/
COPY textExample.js /usr/app/
#COPY main.js /usr/app/
#COPY gameData.js /usr/app/

EXPOSE 5173

CMD ["npx","vite","--host","0.0.0.0"]