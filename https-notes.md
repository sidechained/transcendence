# Django on Docker Example - Setup

https://testdriven.io/blog/dockerizing-django-with-postgres-gunicorn-and-nginx/

1. git clone https://github.com/testdrivenio/django-on-docker.git

2. remove `-sample` from the names of the .env files in the repo
```
mv .env.dev-sample .env.dev
mv .env.prod.db-sample .env.prod.db
mv .env.prod-sample .env.prod
```

3. Replace references to port 1337 (not accessible on campus PC's) with port 9999
`sed -i 's/1337/9999/g' ./README.md ./app/hello_django/settings.py ./docker-compose.prod.yml`

4. Ensure existing containers are down
`docker-compose down -v`

5. Spin up the containers, migrate the database and collect the static files into the local folder
`docker-compose -f docker-compose.prod.yml up -d --build`
`docker-compose -f docker-compose.prod.yml exec web python manage.py migrate --noinput`
`docker-compose -f docker-compose.prod.yml exec web python manage.py collectstatic --no-input --clear`

Now when we go to `http://localhost:9999/admin` we can see the django administration page with 

# Lessons 

I learned that:

1. We use gunicorn `gunicorn backend.wsgi:application --bind 0.0.0.0:8000` in place the standard django development server `python manage.py runserver 0.0.0.0:8000`, which is not up to the job

2. We need a separate nginx container which will act as the reverse proxy and that to serve the site we connect to this container on the port we have mapped to the host machine (9000:80) i.e. `https://localhost:9000/admin/`

# Applying the princinples to our existing server code - Problems

