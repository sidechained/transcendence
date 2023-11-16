FROM python:3.12.0-bookworm
RUN apt-get update &&\
	apt-get install -y --no-install-recommends postgresql-client &&\
	rm -rf /var/lib/apt/lists/*
RUN pip install django-cors-headers gunicorn[gevent] cryptography
COPY requirements.txt ./
RUN pip install -r requirements.txt
RUN django-admin startproject backend
WORKDIR /backend
RUN python manage.py startapp api
COPY conf/localhost.crt conf/localhost.key ./
COPY backend/settings.py ./backend
COPY api/admin.py ./api
COPY api/models.py ./api
COPY api/views.py ./api
COPY api/urls.py ./api
COPY backend/urls.py ./backend
RUN python manage.py makemigrations &&\
	python manage.py migrate &&\
	python manage.py createsuperuser --noinput
	# gunicorn backend.wsgi:application --bind 0.0.0.0:8000
EXPOSE 8000
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]

# creates a user for the admin console @ http://localhost:8000/admin using .env from Dockerfile