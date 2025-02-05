import { query } from "./db";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, passwordHash } = req.body; // Password should be hashed before storing

    try {
      const existingUser = await query("SELECT * FROM Users WHERE email = $1", [email]);

      if (existingUser.rows.length > 0) {
        return res.status(400).json({ error: "User already exists" });
      }

      const result = await query(
        "INSERT INTO Users (email, password_hash) VALUES ($1, $2) RETURNING *",
        [email, passwordHash]
      );

      res.status(201).json(result.rows[0]);
    } catch (error) {
      res.status(500).json({ error: "Database error" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}