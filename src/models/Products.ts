import product from "../types/products.type"
import db from "../database"
class Products {
    async create(p:product):Promise<product> {
        try {
            const connection = await db.connect()
            const sql = `insert into products (name,price) values ($1,$2) returning *`
            const result = await connection.query(sql,[
                p.name,
                p.price
            ])
            connection.release()
            return result.rows[0];
        }catch (error){
            throw new Error(
                `can't create (${p.name}): ${(error as Error).message}`
            )
        }
    }

    async getAll():Promise<product[]>{
        try {
            const connection = await db.connect()
            const sql = 'select * from products'
            const result = await connection.query(sql)
            connection.release()
            return result.rows;
        } catch (error){
            throw new Error(
                `can't get rows: ${(error as Error).message}`
            )
        }
    }

    async getOne(id:number):Promise<product>{
        try {
            const connection = await db.connect()
            const sql = `select * from products where id=$1`
            const result = await connection.query(sql,[id])
            connection.release()
            return result.rows[0]
        }catch (error){
            throw new Error(
                `can't get row : ${(error as Error).message}`
            )
        }
    }
}

export default Products;