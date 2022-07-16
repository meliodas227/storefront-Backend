import order from "../types/orders.type"
import db from "../database"
class Orders {

    async getOne(uid:number):Promise<order>{
        try {
            const connection = await db.connect()
            const sql = `select * from orders where user_id=$1`
            const result = await connection.query(sql,[uid])
            return result.rows[0]
        }catch (error){
            throw new Error(
                `can't get row : ${(error as Error).message}`
            )
        }
    }
}

export default Orders;