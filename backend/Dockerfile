FROM python:3.12.0-bookworm
RUN apt update &&\
    apt install -y --no-install-recommends postgresql-client &&\
    apt install mkcert &&\
    mkdir ./ssl-keys-local &&\
    export CAROOT=/ssl-keys-local &&\
	mkcert -install &&\
    mkcert -cert-file /ssl-keys-local/localhost.pem -key-file /ssl-keys-local/localhost-key.pem localhost &&\
    pip install gunicorn &&\
    rm -rf /var/lib/apt/lists/*
COPY requirements.txt ./
RUN pip install django-cors-headers &&\
    pip install -r requirements.txt &&\
    django-admin startproject backend
WORKDIR /backend
RUN python manage.py startapp api
COPY backend/settings.py ./backend
COPY api/admin.py ./api
COPY api/models.py ./api
COPY api/views.py ./api
COPY api/urls.py ./api
COPY backend/urls.py ./backend
COPY entrypoint.sh .
CMD ["./entrypoint.sh"]