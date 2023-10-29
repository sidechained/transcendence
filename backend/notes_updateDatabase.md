To create a webpage in Ruby on Rails that contains a button to add data to a PostgreSQL database, you'll need several technologies and follow some high-level steps:

**Technologies Needed:**

1. **Ruby on Rails**: You'll use Rails to build the web application.

2. **PostgreSQL Database**: As the database system to store your data.

3. **HTML/CSS**: To create the webpage's structure and styling.

4. **JavaScript**: To add interactivity to your webpage, such as handling button clicks.

**High-Level Steps:**

1. **Set Up Your Development Environment**:
   - Install Ruby and Rails.
   - Set up a PostgreSQL database.

2. **Create a New Rails Application**:
   - Use `rails new` to create a new Rails application.

3. **Generate a Model**:
   - Use `rails generate model` to create a model for the data you want to store in the database.

4. **Run Migrations**:
   - Use `rails db:migrate` to create the database table for your model.

5. **Create a Controller**:
   - Generate a controller using `rails generate controller`.

6. **Add Routes**:
   - Define routes in the `config/routes.rb` file that map to your controller's actions.

7. **Create Views**:
   - Create HTML views for your webpage in the `app/views` directory. Include a button and form for data input.

8. **Add JavaScript**:
   - Use JavaScript to handle button clicks and perform AJAX requests to send data to the server.

9. **Controller Actions**:
   - Implement controller actions to handle data submission from the form.

10. **Database Interactions**:
    - In your controller, interact with the database to insert data using ActiveRecord methods.

11. **Testing**:
    - Write tests for your application, including unit tests for your model and controller.

12. **Start the Server**:
    - Start your Rails server using `rails server`.

13. **Access Your Webpage**:
    - Open a web browser and navigate to your webpage, typically at `http://localhost:3000`.

14. **Interact with the Webpage**:
    - Click the button, add data via the form, and submit it to test your application.

15. **Deployment (Optional)**:
    - Deploy your Rails application to a production server when you're ready.

This is a high-level overview of the steps involved in creating a webpage in Ruby on Rails with a button to add data to a PostgreSQL database. You'll need to dive into the details of each step, write code, and test your application as you go along. Rails provides a powerful framework for building web applications, and there are many resources and tutorials available to help you with each step of the process.