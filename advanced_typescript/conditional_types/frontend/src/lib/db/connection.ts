import { Pool } from "pg";
import { User, UserRole } from "../types/roles";

const pool = new Pool({
    user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || '5432'),
});


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