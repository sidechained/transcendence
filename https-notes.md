I'm following the Nginx section of this:
https://testdriven.io/blog/dockerizing-django-with-postgres-gunicorn-and-nginx/

I learned that I must use:
gunicorn backend.wsgi:application --bind 0.0.0.0:8000
and
python manage.py runserver 0.0.0.0:8000	
not both together!

And that we need a separate nginx container which will act as the reverse proxy

https://localhost:8000/admin/
