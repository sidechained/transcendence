Installing mkcert and generating a certificate

1. Make a mkcert directory, make a Dockerfile inside it

2. Build the image, run the container, exec in

docker build -t mkcert:latest . 
docker run --name mkcert -d mkcert
docker exec -it mkcert /bin/bash

3. Install mkcert and generate the key

root@4b1637ed6b98:/# mkcert -install
Created a new local CA 💥
Installing to the system store is not yet supported on this Linux 😣 but Firefox and/or Chrome/Chromium will still work.
You can also manually install the root certificate at "/root/.local/share/mkcert/rootCA.pem".

root@4b1637ed6b98:/# mkcert localhost 127.0.0.1 
Note: the local CA is not installed in the system trust store.
Run "mkcert -install" for certificates to be trusted automatically ⚠️

Created a new certificate valid for the following names 📜
 - "localhost"
 - "127.0.0.1"

The certificate is at "./localhost+1.pem" and the key at "./localhost+1-key.pem" ✅

It will expire on 20 February 2026 🗓

4. Copy the rootCA, cert and key pem files out of the 

docker cp mkcert:./root/.local/share/mkcert/rootCA.pem .
docker cp mkcert:./localhost+1.pem .
docker cp mkcert:./localhost+1-key.pem .

I put these three commands in copyScript.sh

5. Optionally add the commands from step 3 to the Dockerfile to automate the process next time