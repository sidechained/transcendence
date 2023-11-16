#!/bin/bash
python manage.py makemigrations
python manage.py migrate --no-input
# creates a user for the admin console @ http://localhost:8000/admin using .env credentials:	
python manage.py createsuperuser --no-input 
gunicorn -b 0.0.0.0:8000 -w 4 --certfile=./localhost.crt --keyfile=./localhost.key backend.wsgi:application
# python manage.py runserver 0.0.0.0:8000
