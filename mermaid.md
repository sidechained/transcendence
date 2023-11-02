mermaid

frontend
	node.js
	three.js
	javascript
	puma

backend
	ruby
	rails
	postgreSQL database []

api
	addgamedata player1Name player1Points player2Name player2Points
	getgamedata [id]

docker containers

show begin title screen - welcome to transcendence
ask user to enter name of player 1 - lowercase only
ask user to enter name of player 2 - lowercase only
start the 3D pong game - 
when a game completes, send result to backend as json, using
	API: [post] addgamedata player1Name player1Points player2Name player2Points
show results title screen - press enter to see game results
show result 1
	API: [post] getgamedata 1
show result 2
when no more results, show end title screen

// code

flowchart TB

    subgraph backend-container
    recvRequest-addgamedata
    recvRequest-getgamedata    
    sendReponse-addgamedata
    sendReponse-getgamedata
    end
    
    subgraph frontend-container
    sendRequest-addgamedata
    sendRequest-getgamedata    
    recvResponse-addgamedata
    recvResponse-getgamedata
    end
    
    subgraph backend_db-container
    id1[(Database)]
    end

    sendRequest-addgamedata -- API: [POST] player1Name player1Score player2Name player2Score -->recvRequest-addgamedata
    sendReponse-addgamedata -- response OK, NOT OK, ERROR -->recvResponse-addgamedata
    sendRequest-getgamedata -- API: [POST] id -->recvRequest-getgamedata
    sendReponse-getgamedata -- response OK [id player1Name player1Score player2Name player2Score], NOT OK, ERROR -->recvResponse-getgamedata    

    recvRequest-addgamedata-->backend_db-container