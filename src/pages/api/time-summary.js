import { query } from "./db";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { userId } = req.query;

    try {
      const result = await query(`
        SELECT 
          G.galaxy_id, G.name AS galaxy_name, 
          P.planet_id, P.name AS planet_name, 
          M.moon_id, M.name AS moon_name, 
          COALESCE(SUM(T.time_logged), 0) AS total_time 
        FROM TimeLogs T
        LEFT JOIN Galaxies G ON T.galaxy_id = G.galaxy_id
        LEFT JOIN Planets P ON T.planet_id = P.planet_id
        LEFT JOIN Moons M ON T.moon_id = M.moon_id
        WHERE T.user_id = $1
        GROUP BY G.galaxy_id, P.planet_id, M.moon_id, G.name, P.name, M.name
        ORDER BY G.galaxy_id, P.planet_id, M.moon_id;
      `, [userId]);

      res.status(200).json(result.rows);
    } catch (error) {
      res.status(500).json({ error: "Database error" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}