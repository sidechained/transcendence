FROM node:21
WORKDIR /usr/app
COPY ./conf/vite.config.js .
RUN apt-get update &&\
    apt-get install nano &&\
    apt-get install curl &&\
    npm install --save three &&\
    npm install --save-dev vite
COPY index.html /usr/app/
COPY textExample.js /usr/app/
COPY gameData.js /usr/app/
#COPY main.js /usr/app/
EXPOSE 5173
CMD ["npx", "vite"] # certficate/network settings are in vite.config.js