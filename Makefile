all: up

up:
	docker compose up --build

down:
	docker compose down

clean:
	docker system prune -a
	docker volume rm $(docker volume ls -q)

prune:
	docker system prune -a

exec_backend:
	docker compose exec -it backend /bin/bash

exec_backend_db:
	docker compose exec -it backend_db /bin/bash

exec_frontend:
	docker compose exec -it frontend /bin/bash

cp:
	docker cp backend:/backend/config/routes.rb test.rb

.PHONY: all up down clean prune exec cp