import { query } from "./db";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { userId, galaxyId, planetId, moonId, timeLogged } = req.body;

    try {
      const result = await query(
        "INSERT INTO TimeLogs (user_id, galaxy_id, planet_id, moon_id, time_logged) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [userId, galaxyId, planetId, moonId, timeLogged]
      );
      res.status(200).json(result.rows[0]);
    } catch (error) {
      res.status(500).json({ error: "Database error" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}