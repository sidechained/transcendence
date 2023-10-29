all: up

up: build runi

down: stop

build:
	docker build -t frontend .

runi: # doesn't exit correctly when using CTRL+C
	docker run -it --rm -p 5173:5173 --name frontend-container frontend

rund:
	docker run -d -p 5173:5173 --name frontend-container frontend		

stop:
	docker stop frontend-container

# deletes container instance, freeing up the resources it was consuming, such as disk space and network ports.
remove_container: # only needed when using rund, removed automatically in runi (--rm)
	docker rm frontend-container

# remove Docker image from your local image registry (free disk space) 
remove_image:
	docker rmi frontend

logs:
	docker logs frontend-container

exec:
	docker exec -it frontend-container /bin/bash

.PHONY: all up down build run runi rund stop remove logs exec
