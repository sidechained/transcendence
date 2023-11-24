#!/bin/bash
mkdir /ssl-keys-shared
cp /ssl-keys-local/localhost.pem /ssl-keys-shared/
cp /ssl-keys-local/localhost-key.pem /ssl-keys-shared/
cp /ssl-keys-local/rootCA.pem /ssl-keys-shared/
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser --noinput # creates a user for the admin console @ http://localhost:8000/admin using ENV credentials from Dockerfile (or eventually .env file)
gunicorn -w 4 -b 0.0.0.0:8000 --certfile=/ssl-keys-local/localhost.pem --keyfile=/ssl-keys-local/localhost-key.pem backend.wsgi:application