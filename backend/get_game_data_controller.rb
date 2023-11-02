class GetGameDataController < ApplicationController
  def getgamedata
    # Step 1: Retrieve the ID from the request parameters
    id = params[:id] # Assuming the ID is passed as a parameter in the request
    
    # Step 2: Find the record by the ID
    game_data = GameDatum.find_by(id: id)
    
    if game_data
      # Step 3: Handle when the record is found
      render json: game_data, status: :ok
    else
      # Handle the case when the record is not found (you can customize this part)
      render json: { error: 'Record not found' }, status: :not_found
    end
  end
end
