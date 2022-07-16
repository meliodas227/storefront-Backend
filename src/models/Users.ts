import user from "../types/users.type"
import db from "../database"
class Users {
    async create(u:user):Promise<user> {
        try {
            const connection = await db.connect()
            const sql = `insert into users (first_name,last_name,password) values ($1,$2,$3) returning id,first_name,last_name`
            const result = await connection.query(sql,[
                u.firstName,
                u.lastName,
                u.password
            ])
            connection.release()
            return result.rows[0];
        }catch (error){
            throw new Error(
                `can't create (${u.firstName}): ${(error as Error).message}`
            )
        }
    }

    async getAll():Promise<user[]>{
        try {
            const connection = await db.connect();
            const sql = 'select id,first_name,last_name from users'
            const result = await connection.query(sql);
            connection.release()
            return result.rows;
        }catch (error){
            throw new Error(
                `can't get all rows : ${(error as Error).message}`
            )
        }
    }

    async getOne(id:number):Promise<user>{
        try {
            const connection = await db.connect();
            const sql = `select id, first_name, last_name from users where id=$1`
            const result = await connection.query(sql,[id]);
            return result.rows[0]
        }catch (error){
            throw new Error(
                `can't get the row : ${(error as Error).message}`
            )
        }
    }
}

export default Users;