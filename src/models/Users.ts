import user from "../types/users.type";
import db from "../database";
import config from "../config";
import bcrypt from "bcrypt";

const hashPass = (password: string) => {
  const salt = parseInt(config.salt as string, 10);
  return bcrypt.hashSync(`${password}${config.paper}`, salt);
};
class Users {
  async create(u: user): Promise<user> {
    try {
      const connection = await db.connect();
      const sql = `insert into users (user_name,first_name,last_name,password) values ($1,$2,$3,$4) returning id,user_name,first_name,last_name`;
      const result = await connection.query(sql, [
        u.user_name,
        u.first_name,
        u.last_name,
        hashPass(u.password),
      ]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `can't create (${u.first_name}): ${(error as Error).message}`
      );
    }
  }

  async getAll(): Promise<user[]> {
    try {
      const connection = await db.connect();
      const sql = "select id,user_name,first_name,last_name from users";
      const result = await connection.query(sql);
      connection.release();
      return result.rows;
    } catch (error) {
      throw new Error(`can't get all rows : ${(error as Error).message}`);
    }
  }

  async getOne(id: number): Promise<user> {
    try {
      const connection = await db.connect();
      const sql = `select id,user_name, first_name, last_name from users where id=$1`;
      const result = await connection.query(sql, [id]);
      return result.rows[0];
    } catch (error) {
      throw new Error(`can't get the row : ${(error as Error).message}`);
    }
  }

  async auth(userName: string, password: string): Promise<user | null> {
    try {
      const connection = await db.connect();
      const sql = `select password from users where user_name=$1`;
      const result = await connection.query(sql, [userName]);
      if (result.rows.length) {
        const hashPassword = result.rows[0].password;
        const isHash = bcrypt.compareSync(
          `${password}${config.paper}`,
          hashPassword
        );
        if (isHash) {
          const sql1 = `select id,user_name,first_name,last_name from users where user_name=$1`;
          const result1 = await connection.query(sql1, [userName]);
          return result1.rows[0];
        }
      }
      connection.release();
      return null;
    } catch (error) {
      throw new Error(`can't login ${(error as Error).message}`);
    }
  }
}

export default Users;
