import { Pool } from "pg";
import { User, UserRole } from "../types/roles";

const pool = new Pool({
    user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: "Innocentakwolu222$",
  port: parseInt(process.env.DB_PORT || '5432'),
});


console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASSWORD:", process.env.DB_PASSWORD); // Never log in production!
console.log("DB_NAME:", process.env.DB_NAME);
console.log("DB_PORT:", process.env.DB_PORT);



export const query = async (text: string, params?: any[]) => {
    const client = await pool.connect();
    try {
        return await client.query(text, params);
    } catch (error) {
        console.error({message: error});
        return { rows: [] };
    }finally{
        client.release();
    }
}


export const getUserById = async <T extends UserRole>(id: string): Promise<User<T> | null> => {
    const result = await query('SELECT * FROM users WHERE id = $1', [id]);
    return result?.rows[0] as User<T> ?? null;
}