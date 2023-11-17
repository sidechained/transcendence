#!/bin/bash
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser --noinput # creates a user for the admin console @ http://localhost:8000/admin using ENV credentials from Dockerfile (or eventually .env file)
gunicorn -w 4 -b 0.0.0.0:8000 --certfile=cert/localhost.crt --keyfile=cert/localhost.key --ssl-version=tlsv1.2 backend.wsgi:application
#gunicorn -w 4 -b 0.0.0.0:8000 backend.wsgi:application