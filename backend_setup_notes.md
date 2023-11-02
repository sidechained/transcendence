# 1. Spin up postgre database container

# 2. Spin up rails container only when db is properly up (healthcheck)
- create model
player1Name: string
player1Points: int
player2Name: string
player2Points: int
- migrate db
- create controller/model ruby code?
post method
- create route
sendGameData

# 3. Once up, simulate a post request with curl on
```bash
curl -X POST -H "Content-Type: application/json" -d '{
  "player1Name": "Graham",
  "player1Points": 10,
  "player2Points": 8,
  "player2Name": "Yuri"
}' http://localhost:3000/addgamedata
```
Using the rails console, check if a database entry was added

```rails console```
```game_data = GameDatum.find(1)```
```
if game_data
  puts "Record found:"
  puts "player1Name: #{game_data.player1Name}"
  puts "player1Points: #{game_data.player1Points}"
  puts "player2Name: #{game_data.player2Name}"
  puts "player2Points: #{game_data.player2Points}"
  # Add more attributes as needed
else
  puts "No matching record found."
end
```

Test adding multiple entries

# 4. Once this works
test returning an OK response
how is this done in rails? In the controller!

```ruby
def some_action
  # Your action logic here
  # ...

  # Send a JSON response with OK status (status code 200)
  render json: { message: 'OK' }, status: :ok
end
```

# 5. Hook up front end
Check for OK response in console
When this works first make Pong scoreline text update with:
"Sending game data"
Then either
"Game data received ok"
or
"Error"

# 6. Implement intial 'enter name' screen

Welcome to 3D Pong!

Enter Player1 Name:
Enter Player2 Name:

# EXTRA
cut down Gemfile and test if it works - yes!