The aim is to containerise a basic three.js development environment, starting with a simple demo project

# Dockerise node.js
Following guide: https://nodejs.org/en/docs/guides/nodejs-docker-webapp

Dockerfile sets working directory /usr/app
There are our node_modules and package.json and package-lock.json

# What is vite?

Vite is a build tool and development server for web projects, particularly designed for building modern JavaScript applications, including web applications, single-page applications (SPAs), and static websites.

# Dockerise vite

https://medium.com/@dhruvpatel06092000/dockerizing-react-application-built-with-vite-a-simple-guide-4c41eb09defa

## `npm run dev` vs `npx vite`

they do
`npm run dev`

we do
`npx vite`
what is this doing

npx is installed with Node.js, and runs command line programs like Vite so that you don't have to search for the right file in node_modules/ yourself. If you prefer, you can put Vite's common commands into the package.json:scripts list, and use npm run dev instead.

## vite.config.js - is it important?

If you don't create a vite.config.js file, Vite will use its default configuration, which is often sufficient for many projects. However, as your project grows or if you have specific requirements, you may find it beneficial to create a vite.config.js file to fine-tune the Vite setup. You can create this file in the root directory of your Vite project, and Vite will automatically detect and apply the configuration when you run npx vite.

## curl tests

running
`curl http://127.0.0.1:5173/`
from inside the 'exec' container returns without output (empty page) - this is expected

to run outside of the container we need to set host to 0.0.0.0 in Dockerfile CMD line:
`CMD ["npx","vite","--host","0.0.0.0"]`

running
`curl http://172.17.0.2:5173/`
from outside the container now also returns without output (empty page)

now follow https://threejs.org/docs/#manual/en/introduction/Creating-a-scene

making index.html and main.js locally, then using COPY in dockerfile to place them in 

`
COPY index.html /usr/app/index.html
COPY main.js /usr/app/main.js
`

at first I had a white screen because i tried to put main.js in src folder

# pong three.js code inspiration

https://www.youtube.com/watch?v=Ou3Ykcp_-D8 - unfortunately in typescript
https://embed.plnkr.co/zg1iEjXtv0krpPSgkWe3/ - this in javascript

draw table
draw bats
draw ball - cube

in animate loop
{
	move ball
	move bats - 1 left: a, 1 right d, 2 left j, 2 right l
}

# copy in pong code 

modified

