Minor module: User and Game Stats Dashboards.
	
◦ Create user-friendly dashboards that provide users with insights into their own gaming statistics.
◦ Develop a separate dashboard for game sessions, showing detailed statistics, outcomes, and historical data for each match.
◦ Ensure that the dashboards offer an intuitive and informative user interface for tracking and analyzing data.
◦ Implement data visualization techniques, such as charts and graphs, to present statistics in a clear and visually appealing manner.
◦ Allow users to access and explore their own gaming history and performance metrics conveniently.
◦ Feel free to add any metrics you deem useful.

After a game is played

Game Session Dashboard:
[how this game compares to others]
- 

User Dashboard
- number of games won / number of games played [pie chart]
- longest unbeaten streak
- shortest match -> longest match
- digital clock: total time spent playing 2h03m

Show two dashboards side by side

Q: do we 
- pull all the data from the server and generate the stats on the front end, or 
- request certain stats, generate them on the back and serve the result

I guess the latter

API:
get_number_games_played playerName
get_number_games_won playerName
get_shortest_match playerName
get_longest_match playerName
get_total_time_spent_playing playerName

Phase 1: just generate a simple user dashboard using bootstrap for datavis

# Start with using 