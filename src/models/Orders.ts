import order from "../types/orders.type"
import db from "../database"
import product from "../types/products.type";
class Orders {

    async get(uid:number):Promise<order[]>{
        try {
            const connection = await db.connect()
            const sql = `select id,user_id,product_id,quantity_of_product,status_of_order from orders join order_details on user_id=uid where uid=$1;`
            const result = await connection.query(sql,[uid])
            return result.rows
        }catch (error){
            throw new Error(
                `can't get row : ${(error as Error).message}`
            )
        }
    }
}

export default Orders;