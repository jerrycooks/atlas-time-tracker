import { query } from "./db";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { userId } = req.query;

    try {
      // Fetch galaxies
      const galaxies = await query("SELECT * FROM Galaxies WHERE user_id = $1", [userId]);

      // Fetch planets for each galaxy
      const galaxiesWithPlanets = await Promise.all(
        galaxies.rows.map(async (galaxy) => {
          const planets = await query("SELECT * FROM Planets WHERE galaxy_id = $1", [galaxy.galaxy_id]);

          // Fetch moons for each planet
          const planetsWithMoons = await Promise.all(
            planets.rows.map(async (planet) => {
              const moons = await query("SELECT * FROM Moons WHERE planet_id = $1", [planet.planet_id]);
              return { ...planet, moons: moons.rows };
            })
          );

          return { ...galaxy, planets: planetsWithMoons };
        })
      );

      res.status(200).json(galaxiesWithPlanets);
    } catch (error) {
      res.status(500).json({ error: "Database error" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}