FROM python:3.12.0-bookworm
RUN apt-get update &&\
	apt-get install -y --no-install-recommends postgresql-client &&\
	rm -rf /var/lib/apt/lists/* &&\
	pip install django-cors-headers gunicorn[gevent]
COPY requirements.txt .
RUN pip install -r requirements.txt &&\
	django-admin startproject backend
WORKDIR /backend
RUN python manage.py startapp api
COPY entrypoint.sh .
COPY conf/localhost.crt conf/localhost.key .
COPY backend/settings.py ./backend
COPY api/admin.py ./api
COPY api/models.py ./api
COPY api/views.py ./api
COPY api/urls.py ./api
COPY backend/urls.py ./backend
RUN python manage.py collectstatic --no-input
EXPOSE 8000
CMD ["./entrypoint.sh"]
