class AddGameDataController < ApplicationController
  def addgamedata
    player1_name = params[:player1Name]
    player1_points = params[:player1Points]
    player2_name = params[:player2Name]
    player2_points = params[:player2Points]

    # Validate and sanitize the data as needed (this should be done on the front end side)

    # Update the database
    # Example: Create a new record in your GameData model
    GameDatum.create(player1Name: player1_name, player1Points: player1_points, player2Name: player2_name, player2Points: player2_points)

    # Respond with success or error
    # You can render a JSON response, redirect, or use any other suitable response based on your requirements.
    render json: { message: 'OK' }, status: :ok
  end
end
