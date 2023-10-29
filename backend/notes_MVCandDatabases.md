Ruby on Rails (often referred to as Rails) follows the Model-View-Controller (MVC) architectural pattern by default. 

keeps the  (models),  (views), and  (controllers) distinct

Rails comes with ActiveRecord, an Object-Relational Mapping (ORM) tool.
It allows developers to interact with the database using Ruby objects, making it easier to manage data.



# MVC

## Model
business logic
define the database data structure - in my case the "game" model - containing info about each pong game played
how to create and read records

GameID integer representing the game number
Player1Name string
Player1Score integer between 0 and 11
Player2Name string
Player2Score integer between 0 and 11
GameWinner string

## View
presentation

"create" page - contains a button which will add a new random "game" record to the database
"read" page - requests the data about each game and displays it

## Controller
request handling

when button is clicked, the controller will receive the request and interact with the model to add a record to the database.


RESTful Routing: Rails encourages RESTful routing, which is inherently tied to the MVC pattern. RESTful routes map HTTP verbs (GET, POST, PUT, DELETE) to controller actions, promoting a structured and predictable way of handling requests.

POST: Create a new resource on the server.

# routing

Routing is set up in the Rails application to map the URL of the welcome page to the corresponding controller action. This is where the button click event would be handled


# aim: to implement the MVC above...

## create

generate model:
`rails generate model Game game_id:integer player1_name:string player1_score:integer player2_name:string player2_score:integer game_winner:string`
migrate the database 
`rake db:migrate`
rake db:migrate is a critical command for managing and evolving your database schema as your Rails application grows and changes. It helps ensure that the database structure matches your application's current needs and that you can version-control these changes over time.

make /app/app/models/game.rb look like this:
```
class Game < ApplicationRecord
  validates :player1_score, inclusion: { in: 0..11 }
  validates :player2_score, inclusion: { in: 0..11 }
end
```

generate controller:
`rails generate controller Games`

make /app/app/controllers/games_controller.rb look like this:
```
class GamesController < ApplicationController
  # Action to create a new game record
  def create
    Game.create(
      game_id: 0,
      player1_name: 'Graham',
      player1_score: 11,
      player2_name: 'Yuri',
      player2_score: 0,
      game_winner: 'Graham'
    )
    redirect_to games_path, notice: 'Fixed game record created.'
  end

  # Action to display game records
  def show
    @games = Game.all
    # Logic to display game records in a view
  end
end
```

go to URL: http://localhost:3000/games/create
then check if data got added:

`rails console`
`Game.all`
`exit`



## read

i.e.
GameID 0
Player1Name Graham
Player1Score 11
Player2Name Yuri
Player2Score 0
GameWinner Graham