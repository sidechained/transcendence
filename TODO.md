DONE: fix issue that points cannot be zero
DONE: implement get_game_data (post) on server side
DONE: update javascript code to send data in correct format (still not working)
DONE: update javascript code to parse json response django is now sending
DONE: get .env working properly
make textExample.js and main.js into one coherent whole
update mermaid file
update Notion

# For mermaid...

Front End Docker Container
javascript, node.js, three.js, puma
http://localhost:5173

Back End Docker Container
python, django
http://localhost:8000

Database Docker Container
http://localhost:5432

# Front End Back End flow...

FE: access front end via http://localhost:5173
FE: enter player names
FE: pong game begins and is played to completion
FE: HTTP POST request is sent to http://localhost:8000/api/add_game_data/ with game data json as body
BE: parse request 
- if the request method is not POST, send HTTP response: 400 Bad Request {json body: 'POST request required'} 
- if json parsing fails, send HTTP response: 400 Bad Request {json body: 'Invalid JSON data'} 
- if any of the data elements are not provided, send HTTP response: 400 Bad Request {json body: 'Invalid data provided'} 
- otherwise add game data to the database and send HTTP response: 201 Created {json body: 'Game data added successfully'}
FE: parse response
- if 400 Bad Request, display json body as text and go no further
- if 201 Created, HTTP GET request is sent to http://localhost:8000/api/get_game_data/1/ where '1' is the num of the requested record
BE: parse request
- if the request method is not GET, send HTTP response: 400 Bad Request {json body: 'GET request required'}
- if the requested record doesn't exist at the given id, send HTTP response: 404 Not Found{"Game data does not exist"}
- otherwise send HTTP response: 200 OK {json body: game data}
FE: parse response
- if 400 Bad Request, display json body as text and go no further
- if 200 OK, parse body and display game data

Game Data:
id
player1_name
player1_points
player2_name
player2_points