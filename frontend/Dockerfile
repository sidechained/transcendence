FROM node:21
COPY ./cert/localhost-key.pem .
COPY ./cert/localhost.pem .
COPY ./cert/rootCA.pem /usr/local/share/ca-certificates/
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
CMD ["npx", "vite"]
#CMD ["npx", "vite", "--host", "0.0.0.0"]
#CMD ["npx", "vite", "--https", "--cert", "/localhost-key.pem", "--key", "/localhost.pem", "--host", "0.0.0.0"]
