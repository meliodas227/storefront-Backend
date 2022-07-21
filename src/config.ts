import dotenv from "dotenv";

dotenv.config();

const {
  PORT,
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_USER,
  POSTGRES_DB,
  POSTGRES_PASSWORD,
  BCRYPT_PASSWORD,
  SALT_ROUNDS,
  TOKEN,
} = process.env;

export default {
  port: PORT,
  pgHost: POSTGRES_HOST,
  pgPort: POSTGRES_PORT,
  pgUser: POSTGRES_USER,
  pgDB: POSTGRES_DB,
  pgPassword: POSTGRES_PASSWORD,
  paper: BCRYPT_PASSWORD,
  salt: SALT_ROUNDS,
  token: TOKEN,
};
