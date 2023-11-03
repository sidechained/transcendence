#!/bin/bash
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser --noinput # creates a user for the admin console @ http://localhost:8000/admin using ENV credentials from Dockerfile (or eventually .env file)
python manage.py runserver 0.0.0.0:8000
