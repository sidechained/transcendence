all: up

up: build runi

down: stop

build:
	docker build -t threejs .

runi: # doesn't exit correctly when using CTRL+C
	docker run -it --rm -p 5173:5173 --name threejs-container threejs

rund:
	docker run -d -p 5173:5173 --name threejs-container threejs		

stop:
	docker stop threejs-container

# deletes container instance, freeing up the resources it was consuming, such as disk space and network ports.
remove_container: # only needed when using rund, removed automatically in runi (--rm)
	docker rm threejs-container

# remove Docker image from your local image registry (free disk space) 
remove_image:
	docker rmi threejs

logs:
	docker logs threejs-container

exec:
	docker exec -it threejs-container /bin/bash

.PHONY: all up down build run runi rund stop remove logs exec
