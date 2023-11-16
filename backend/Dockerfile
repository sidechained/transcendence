FROM python:3.12.0-bookworm
RUN apt-get update && \
	apt-get install -y --no-install-recommends postgresql-client && \
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
COPY entrypoint.sh .
EXPOSE 8000
CMD ["./entrypoint.sh"]