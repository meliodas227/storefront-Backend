import order from "../types/orders.type";
import db from "../database";
import product from "../types/products.type";
import ordersType from "../types/orders.type";
class Orders {
  async create(o: ordersType): Promise<ordersType> {
    try {
      const connection = await db.connect();
      const sql = `insert into order_details (uid,quantity_of_product,product_id) values ($1,$2,$3)`;
      const create = await connection.query(sql, [
        o.userId,
        o.quantity_of_product,
        o.productId,
      ]);
      if ((await this.get(o.userId as number)).length == 0) {
        const sql2 = `insert into orders (user_id,status_of_order) values ($1,$2)`;
        await connection.query(sql2, [o.userId, o.status_of_order]);
      }
      const result = await connection.query(
        `select * from orders join order_details on (uid=user_id) where user_id=$1`,
        [o.userId]
      );
      connection.release();
      return result.rows[result.rowCount - 1];
    } catch (error) {
      throw new Error(`can't create row : ${(error as Error).message}`);
    }
  }
  async get(uid: number): Promise<order[]> {
    try {
      const connection = await db.connect();
      const sql = `select id,user_id,product_id,quantity_of_product,status_of_order from orders join order_details on user_id=uid where uid=$1;`;
      const result = await connection.query(sql, [uid]);
      return result.rows;
    } catch (error) {
      throw new Error(`can't get rows : ${(error as Error).message}`);
    }
  }
}

export default Orders;
