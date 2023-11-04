all: up

up:
	docker compose up --build

down:
	docker compose down

re: down up

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

test_add_game_data:
	curl -X POST -d "player1_name=John&player1_points=10&player2_name=Jane&player2_points=8" http://localhost:8000/api/add_game_data/

test_add_game_data_json:
	curl -X POST -H "Content-Type: application/json" -d '{"player1_name": "John", "player1_points": 10, "player2_name": "Jane", "player2_points": 8}' http://localhost:8000/api/add_game_data/

test_get_existing_game_data:
	curl -X GET http://localhost:8000/api/get_game_data/1/

test_get_nonexistant_game_data:
	curl -X GET http://localhost:8000/api/get_game_data/1000/		

.PHONY: all up down re clean prune exec_backend exec_backend_db exec_frontend cp_example test_add_game_data test_add_game_data_json test_get_game_data