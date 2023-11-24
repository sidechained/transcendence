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

test_http_add_game_data:
	curl -X POST -H "Content-Type: application/json" -d '{"player1_name": "John", "player1_points": 10, "player2_name": "Jane", "player2_points": 8}' http://localhost:8000/api/add_game_data/

test_http_get_game_data:
	curl -X GET http://localhost:8000/api/get_game_data/1/

test_http_get_unavailable_game_data:
	curl -X GET http://localhost:8000/api/get_game_data/1000/		

test_https_add_game_data:
	curl --cert ./backend/cert/localhost.crt --key ./backend/cert/localhost.key --insecure -X POST -H "Content-Type: application/json" -d '{"player1_name": "John", "player1_points": 10, "player2_name": "Jane", "player2_points": 8}' https://localhost:8000/api/add_game_data/

mkcert_https_add_game_data:
	curl --cert ./ssl-keys/localhost.pem --key ./ssl-keys/localhost-key.pem --cacert ./ssl-keys/rootCA.pem -X POST -H "Content-Type: application/json" -d '{"player1_name": "John", "player1_points": 10, "player2_name": "Jane", "player2_points": 8}' https://localhost:8000/api/add_game_data/

test_https_get_game_data:
	curl --cert ./backend/cert/localhost.crt --key ./backend/cert/localhost.key --insecure -X GET https://localhost:8000/api/get_game_data/1/

test_https_selfsigned_add_game_data:
	curl -k -X POST -H "Content-Type: application/json" -d '{"player1_name": "John", "player1_points": 10, "player2_name": "Jane", "player2_points": 8}' https://localhost:8000/api/add_game_data/

test_https_selfsigned_get_game_data:
	curl -k -X GET https://localhost:8000/api/get_game_data/1/

.PHONY: TODO
