import { Pool } from "pg";

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "permissions_access",
  password: "Innocentakwolu222$",
  port: 5432,
});

(async () => {
  try {
    const res = await pool.query("SELECT NOW()");
    console.log("Connected to DB:", res.rows[0]);
  } catch (error) {
    console.error("DB connection error:", error);
  } finally {
    pool.end();
  }
})();
