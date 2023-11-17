all: up

up: down
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

cp_example:
	docker cp backend:/backend/config/routes.rb test.rb

generate_self_signed_cert:
	mkdir ./backend/cert
	openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
	-keyout ./backend/cert/localhost.key \
	-out ./backend/cert/localhost.crt \
	-subj "/C=DE/ST=Berlin/L=Berlin/O=42 School/OU=gbooth/CN=gbooth/"

test_http_add_game_data:
	curl -X POST -H "Content-Type: application/json" -d '{"player1_name": "John", "player1_points": 10, "player2_name": "Jane", "player2_points": 8}' http://localhost:8000/api/add_game_data/

test_http_get_game_data:
	curl -X GET http://localhost:8000/api/get_game_data/1/

test_http_get_unavailable_game_data:
	curl -X GET http://localhost:8000/api/get_game_data/1000/		

test_https_add_game_data:
	curl --cert ./backend/cert/localhost.crt --key ./backend/cert/localhost.key --insecure -X POST -H "Content-Type: application/json" -d '{"player1_name": "John", "player1_points": 10, "player2_name": "Jane", "player2_points": 8}' https://localhost:8000/api/add_game_data/

test_https_get_game_data:
	curl --cert ./backend/cert/localhost.crt --key ./backend/cert/localhost.key --insecure -X GET https://localhost:8000/api/get_game_data/1/

test_https_selfsigned_add_game_data:
	curl -k -X POST -H "Content-Type: application/json" -d '{"player1_name": "John", "player1_points": 10, "player2_name": "Jane", "player2_points": 8}' https://localhost:8000/api/add_game_data/

test_https_selfsigned_get_game_data:
	curl -k -X GET https://localhost:8000/api/get_game_data/1/


.PHONY: TODO
