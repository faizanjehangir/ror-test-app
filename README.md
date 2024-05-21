# Ruby on Rails 7 with React Frontend

This project is a Ruby on Rails 7 application with a React frontend. It follows the test instructions to allow a player to interact with offers and claim them for further usage.

## Demo

https://github.com/faizanjehangir/ror-test-app/assets/4929436/c1b211f1-675f-4eb9-8d45-47e3890bfa3b

## Prerequisites

Before you begin, ensure you have the following installed:

- **Ruby**: Version 3.0 or later
- **Rails**: Version 7.0 or later
- **Node.js**: Version 14.x or later
- **Yarn**: Version 1.22.x or later
- **PostgreSQL**: Version 12.x or later

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/faizanjehangir/ror-test-app.git
cd ror-test-app
```

### 2. Install Ruby Gems

Run `bundle install` to install the necessary gems

### 3. Install JavaScript Packages

Run `yarn install` to install the necessary JavaScript packages

### 4. Set Up the Database

#### 1. Create the Database:

Ensure PostgreSQL is running and create the database.

`rails db:create`

Load the tables using:

`rails db:schema:load`

#### 2. Seed the Database:

Seed the database with initial data.

`rails db:seed`

### 5. Start the Development Server

`bin/dev`

### 6. Access the Application

Open your browser and navigate to http://localhost:3000 to access the application.

### 7. Testing

To run the RSpec tests, use: `bundle exec rspec`

### 8. Troubleshooting

#### 1. Database Connection Error:

Ensure PostgreSQL is running and the database configuration in config/database.yml is correct.

#### 2. Yarn Install Failures:

Ensure you have the correct version of Node.js and Yarn installed.

#### 3. Server Not Starting:

Check the logs for any errors and ensure all dependencies are installed.

### 8. Enhancements

Few future improvments that could be covered to improve performance and reliability of this app.

#### 1. Cache Offers data

Since the offers presented to players are decoupled using the `age` and `gender` data, we could cache the responses for a limited time period for subsequence requests.

#### 2: User Authentication

For the purpose of simiplicity, built-in support, secrurity and time constraints, this app is using user sessions for auth. 

If we want to look beyond the scope of this test application, we can explore `Devise` for implementation purpose and other alternative auth options.  Few of them are as follows:

```bash
* JSON Web Tokens (JWT)
* OAuth 2.0
* Token-based Authentication
* Multi-factor Authentication (MFA)
```

#### 3. Context and Providers for sharing data in React

Use `React Context` and `Provider` to share data between components and avoid prop drilling or having multiple redundant `api` calls across the application.

#### 4. Error handling and logging

Improve app error handling and logging by using a 3rd party integration on cloud for tracking errors and setting up app alerts for any failures.
