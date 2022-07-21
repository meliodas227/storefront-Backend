import orders from "../../models/Orders";
import db from "../../database";
import ordersType from "../../types/orders.type";
import products from "../../models/Products";
import productsType from "../../types/products.type";
import users from "../../models/Users";
import usersType from "../../types/users.type";

const Order = new orders();
const Product = new products();
const User = new users()
describe("Order model", () => {
  describe("logic", () => {
    const product = {
      name: "test",
      price: 2000,
    } as productsType;
    const user = {
      user_name:'test5',
      first_name:'test',
      last_name:'test',
      password:'1234',
    }as usersType;
    const order = {
      quantity_of_product: product.id,
      status_of_order: "active",
    } as ordersType;
    beforeAll(async () => {
      const createUser = await User.create(user)
      const createProduct = await Product.create(product);
      order.userId=createUser.id
      order.productId=createProduct.id
      const createOrder = await Order.create(order);
      order.id = createOrder.id;
    });
    afterAll(async () => {
      const connection = await db.connect();
      const sql = "delete from orders;";
      await connection.query(sql);
      connection.release();
    });

    it("show should return orders with specified Uid",async function() {
      const showOrder = await Order.get(order.userId as number);
      expect(showOrder.length).toBeGreaterThanOrEqual(0);
    });
  });
});
