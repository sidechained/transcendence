YES	Can send https curl requests from inside the backend container
YES	Can send https curl requests from host machine 
YES	Can access frontend over https
NO	Can send https api requests javascript front end. This warning:
backend-container     | [2023-11-21 10:35:20 +0000] [12] [WARNING] Invalid request from ip=192.168.112.1: [SSL: SSLV3_ALERT_CERTIFICATE_UNKNOWN] sslv3 alert certificate unknown (_ssl.c:2559)

currently:
spin up postgres db
spin up docker backend, generate certs with mkcert
copy certs out into ./frontend/certs

1. make certs accessible using shared volume?
2. copy out certs from backend container using makefile rule cp_cert
3. generate certs on host machine and copy in
4. copy certs from backend into shared conf dir, then (easiest for now)
- but be aware docker COPY can only copy from inside the container's folder, so we would have to copy these twice

Django admin dashboard causes this error:
[2023-11-21 09:09:25 +0000] [13] [WARNING] Invalid request from ip=192.168.32.1: [SSL: SSLV3_ALERT_CERTIFICATE_UNKNOWN] sslv3 alert certificate unknown (_ssl.c:2559)