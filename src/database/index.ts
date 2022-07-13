import { Pool } from "pg";
import config from "../config";
const pool = new Pool({
  host: config.pgHost,
  database: config.pgDB,
  user: config.pgUser,
  password: config.pgPassword,
  port: parseInt(config.pgPort as string, 10),
});



export default pool;
