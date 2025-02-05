import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const query = async (text, params) => {
  const result = await pool.query(text, params);
  return result;
};

export default pool;