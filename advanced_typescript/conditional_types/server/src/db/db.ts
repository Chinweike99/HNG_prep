
import pgPromise from 'pg-promise';

const pgp = pgPromise();
const db = pgp({
  host: process.env.HOST,
  port: process.env.PORT ? Number(process.env.PORT) : undefined,
  database: process.env.DATABASE,
  user: process.env.USER,
  password: process.env.PASSWORD
});

export default db;