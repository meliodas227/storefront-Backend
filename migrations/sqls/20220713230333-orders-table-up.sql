/* Replace with your SQL commands */
create table orders(
    id serial primary key,
    quantity_of_product_in_order int,
    status_of_order varchar(10),
    User_id int,
    product_id int,
    constraint fk_user_id
                   FOREIGN KEY(User_id)
                   REFERENCES users(id),
    constraint fk_product_id
                   foreign key(product_id)
                   references products(id)
);