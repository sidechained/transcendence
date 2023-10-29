# Use an official Ruby runtime as a parent image
FROM ruby:3.0

# Set the working directory in the container
WORKDIR /backend

# Install Rails and other dependencies
RUN apt-get update && apt-get install nano -y
RUN gem install rails

# Create a new Rails application
RUN rails new . --database=postgresql
RUN rails generate controller Welcome index

COPY database.yml /backend/config/database.yml
COPY routes.rb /backend/config/routes.rb
COPY index.html.erb /backend/app/views/welcome/index.html.erb

# Expose port 3000 (the default Rails server port)
EXPOSE 3000

# Install project dependencies (gems)
RUN bundle install

# Expose port 3000 (the default Rails server port)
EXPOSE 3000

# Start the Rails server
CMD ["rails", "server", "-b", "0.0.0.0"]