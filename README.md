# Storefront Backend Project

## Required Technologies

Your application must make use of the following libraries:

- Postgres for the database
- Node/Express for the application logic
- dotenv from npm for managing environment variables
- db-migrate from npm for migrations
- jsonwebtoken from npm for working with JWTs
- jasmine from npm for testing

# How to use the Api
## setting up the project

- use npm install or yarn install in the terminal to install all packages
- you will find ENV_EXAMPLE file make an .env file with specified variables before starting
- use npx db-migrate up in the terminal to build the structure of all tables
- use yarn start in the terminal to make nodemon start the server
- you can also use yarn build to run the server without nodemon.
- use postman or any similar app to make requests.
- to create user make a post request to localhost:3000/api/users and add values to these prams in the body {userName,firstName,lastName,password}
- to auth the user use localhost:3000/api/users/auth and pass the right userName and password to the body
- to index make a get request to localhost:3000/api/users
- to show make a get request to localhost:3000/api/users/${id}
- same on products but to create you will pass these params {name,price} show and index are the same and you use path to products like this localhost:3000/api/products
- to show in orders you make a get request to localhost:3000/api/orders/${uid} as uid is user id


# tables structure


## users

id | user_name | first_name | last_name | password
 --- | --- | --- | --- |---
serial primary key | varchar unique | varchar | varchar | varchar

## products

id | name | price
--- | --- | ---
serial primary key | varchar | INT

## orders

user_id | status_of_order
--- | ---
INT primary key | varchar
forign key references users(id) | ---

## order_details

id | uid | product_id | quantity_of_product
--- | --- | --- | ---
serial primary key | forign key references users(id) | forign key references products(id) | INT

