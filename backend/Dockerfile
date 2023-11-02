# Use an official Ruby runtime as a parent image
FROM ruby:3.0

WORKDIR /backend

RUN apt-get update
RUN apt-get install nano -y
RUN gem install rails

# Create a new Rails application (api mode, no views)
RUN rails new . --api --database=postgresql
RUN rails generate controller AddGameData addgamedata
RUN rails generate controller GetGameData getgamedata
RUN rails generate model GameData player1Name:string player1Points:integer player2Points:integer player2Name:string

COPY Gemfile /backend/Gemfile
COPY cors.rb /backend/config/initializers/
COPY database.yml /backend/config/
COPY routes.rb /backend/config/
COPY add_game_data_controller.rb /backend/app/controllers/
COPY get_game_data_controller.rb /backend/app/controllers/
COPY entrypoint.sh /backend/

# Install gems from Gemfile (cors, particularly)
RUN bundle install

# Expose port 3000 (the default Rails server port)
EXPOSE 3000