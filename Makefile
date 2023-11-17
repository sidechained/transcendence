all: up

up:
	docker-compose build --pull --no-cache
	docker compose up -d --build

down:
	docker compose down

re: down up

prune:
	docker system prune -a

exec_backend:
	docker compose exec -it backend /bin/bash

exec_backend_db:
	docker compose exec -it backend_db /bin/bash

exec_frontend:
	docker compose exec -it frontend /bin/bash

cp_example:
	docker cp backend:/backend/config/routes.rb test.rb

generate_self_signed_cert:
	openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
	-keyout /home/gbooth/Desktop/ttest/backend/conf/localhost.key \
	-out /home/gbooth/Desktop/ttest/backend/conf/localhost.crt \
	-subj "/C=DE/ST=Berlin/L=Berlin/O=42 School/OU=gbooth/CN=gbooth/"

test_http_add_game_data:
	curl -X POST -H "Content-Type: application/json" -d '{"player1_name": "John", "player1_points": 10, "player2_name": "Jane", "player2_points": 8}' http://localhost:8000/api/add_game_data/

test_http_get_game_data:
	curl -X GET http://localhost:8000/api/get_game_data/1/

test_https_add_game_data:
	curl -X POST -H "Content-Type: application/json" -d '{"player1_name": "John", "player1_points": 10, "player2_name": "Jane", "player2_points": 8}' http://localhost:8000/api/add_game_data/

test_https_get_game_data:
	curl -X GET http://localhost:8000/api/get_game_data/1/

test_get_unavailable_game_data:
	curl -X GET http://localhost:8000/api/get_game_data/1000/	

.PHONY: all up down re clean prune exec_backend exec_backend_db exec_frontend cp_example test_add_game_data test_get_game_data test_https_add_game_data test_https_get_game_data test_get_unavailable_game_data
