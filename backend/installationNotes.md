What do I want to do?

Have a debian-based docker container running node js, npm and three.js, run vs code within it and then connect to it from my native OS browser

# Create my dev container

Following guide: https://semaphoreci.com/community/tutorials/dockerizing-a-node-js-web-application

Dockerfile

```

```

# Installing Docker Desktop

Follow guide: https://docs.docker.com/desktop/install/ubuntu/
systemctl --user start docker-desktop

# Run VS Code in a Docker/Dev Container

Follow guide: https://code.visualstudio.com/docs/devcontainers/tutorial

In short:
VS Code -> Extensions -> Search "Dev Container" Extension and Install
VS Code -> Command Palette -> Search "Dev Containers: Try a Dev Container Sample" -> Node
Bottom left of status bar shows remote context i.e. whether VS Code is running from within a dev container or not
Press F5 to run, then go to http://localhost:3000 in browser

The tutorial explains more in the "How it works" section

# Build own Dev Container


Follow Quick Start for Open an existing folder in a container
https://code.visualstudio.com/docs/devcontainers/containers

# Swap out the image used by the Dev Container for a Dockerfile with three.js installed

Follow guide: https://containers.dev/guide/dockerfile

In devcontainer.json, remove the 'image' property and add the 'build' and 'dockerfile' properties instead
Path is relative to the devcontainer.json file.

```
    "build": {
         "dockerfile": "Dockerfile"
    }
```

# Install Three.js

Three.js is installed on top of node.js and npm, which should have been installed by the dev container sample


## Create a directory for your Three.js project and navigate into it:

```
mkdir my-threejs-project
cd my-threejs-project
```

## Initialize a new Node.js project:
Use npm init to create a package.json file for your project. You can either follow the prompts or use the -y flag to accept the defaults.

`npm init -y`

## Install the Three.js library via npm:

npm install three




#

https://dockerize-threejs.vercel.app/