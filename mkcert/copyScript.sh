#/bin/bash

docker cp mkcert:./root/.local/share/mkcert/rootCA.pem .
docker cp mkcert:./localhost+1.pem .
docker cp mkcert:./localhost+1-key.pem .