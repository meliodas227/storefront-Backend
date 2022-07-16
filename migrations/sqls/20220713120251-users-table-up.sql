/* Replace with your SQL commands */
create table users(
    id serial primary key,
    user_name varchar(50) unique,
    password varchar(100),
    first_name varchar(100),
    last_name varchar(100)
);