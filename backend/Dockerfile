FROM python:3.12.0-bookworm
RUN apt-get update &&\
    apt-get install -y --no-install-recommends postgresql-client &&\
    rm -rf /var/lib/apt/lists/* &&\
    pip install gunicorn
COPY requirements.txt ./
RUN pip install django-cors-headers &&\
    pip install -r requirements.txt &&\
    django-admin startproject backend
WORKDIR /backend
RUN python manage.py startapp api
COPY cert ./cert
COPY backend/settings.py ./backend
COPY api/admin.py ./api
COPY api/models.py ./api
COPY api/views.py ./api
COPY api/urls.py ./api
COPY backend/urls.py ./backend
COPY entrypoint.sh .
CMD ["./entrypoint.sh"]