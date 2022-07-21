/* Replace with your SQL commands */
create table orders(
    status_of_order varchar(10),
    user_id int primary key,
    constraint fk_user_id
                   FOREIGN KEY(user_id)
                   REFERENCES users(id)
                   on delete cascade
);