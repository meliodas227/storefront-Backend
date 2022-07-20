/* Replace with your SQL commands */
create table order_details(
    id serial primary key,
    uid int,
    quantity_of_product int,
    product_id int,
    constraint fk_product_id
        foreign key(product_id)
            references products(id),
    constraint fk_user_id
        FOREIGN KEY(uid)
            REFERENCES users(id)
)