YES	Can send https curl requests from inside the backend container
YES	Can send https curl requests from host machine 
YES	Can access frontend over https
NO	Can send https api requests javascript front end. This warning:
backend-container     | [2023-11-21 10:35:20 +0000] [12] [WARNING] Invalid request from ip=192.168.112.1: [SSL: SSLV3_ALERT_CERTIFICATE_UNKNOWN] sslv3 alert certificate unknown (_ssl.c:2559)
NO Django admin dashboard causes this error:
[2023-11-21 09:09:25 +0000] [13] [WARNING] Invalid request from ip=192.168.32.1: [SSL: SSLV3_ALERT_CERTIFICATE_UNKNOWN] sslv3 alert certificate unknown (_ssl.c:2559)

Current approach is:
- spin up docker backend, generate certs with mkcert
- copy certs out into ./frontend/certs
But we can't copy out, only in, so we need another approach

1. make certs accessible using shared volume?

2. copy out certs from backend container using makefile rule cp_cert
- this would have to happen between the backend and frontend going up and feels hacky

3. generate certs on host machine and copy into both front and backend
- make an 'mkcert' docker container
- generate the certs within it (one time only)
- copy the certs out into mkcert folder
- (put a rule in the Makefile for this, don't include in docker-compose.yml)
- in both the backend and frontend Dockerfile, copy in the cert key and rootCA
- test backend first with curl tests, then frontend

