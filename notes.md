Here are some notes on creating stats dashboards and other things with bootstrap

# Requirements (from subject PDF)

Minor module: User and Game Stats Dashboards.
	
◦ Create user-friendly dashboards that provide users with insights into their own gaming statistics.
◦ Develop a separate dashboard for game sessions, showing detailed statistics, outcomes, and historical data for each match.
◦ Ensure that the dashboards offer an intuitive and informative user interface for tracking and analyzing data.
◦ Implement data visualization techniques, such as charts and graphs, to present statistics in a clear and visually appealing manner.
◦ Allow users to access and explore their own gaming history and performance metrics conveniently.
◦ Feel free to add any metrics you deem useful.

# How to do it?

- We will create some api endpoints that allow us to request specific stats.
- These will be calculated on the server side and sent back as json.

For example we make a POST request such as:
- http://localhost:8000/api/get_number_games_played [playerName]
And our dashboard will either show the received json data or display something like "server error"

Using bootstrap is straightforward and nothing must be pre-installed, we can just refer dynamically to the bootstrap CDN elements e.g. in place following in html head:
```<link href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">```

# What dashboards do we need?

## Before the Game

1. Registration Dashboard

Allows user to enter number of players, then player names, so that the game can begin
This is local only, it doesn't communicate with the backend, it will just send

- this doesn't really count as a dashboard but nontheless will use bootstrap to create it

## After the Game

2. Game Session Stats Dashboard

Displays stats on how this game compares to others
For example 'this game length' vs 'average_game_length' [superimposed graph bars]
- Q: do we need to get info on current game, or do we use what we already have?
Example API GET request:
http://localhost:8000/api/get_average_game_length

3. User Stats Dashboard

Displays:
- number of games won out of number of games played 	[pie chart]
- number of games unbeaten (streak) 					[number value]
- shortest match ----> longest match 					[timeline]
- total time spent playing 2h03m 						[digital clock]

API endpoint examples:
http://localhost:8000/api/get_number_games_played playerName
http://localhost:8000/api/get_number_games_won playerName
http://localhost:8000/api/get_number_games_unbeaten_streak playerName
http://localhost:8000/api/get_shortest_match playerName
http://localhost:8000/api/get_longest_match playerName
http://localhost:8000/api/get_total_time_spent_playing playerName

# Experimental Examples I Made So Far...

bootstrap-example.html		simple example provided, with banner and button
datavis-example.html		shows some simple display options

minimal-apiFetch.html		shows the basics of what we need to make an API call to the backend
betterdash-nocss.html		Example User Game Stats Dashboard example (no css)
betterdash-withcss.html		Example User Game Stats Dashboard example with css shadowing
game-stats-dashboard.html	Example Game Stats Dashboard