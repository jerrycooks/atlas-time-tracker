# Atlas Time-Tracking App

## Overview
Atlas is a professional time-tracking application designed to help users track time across different work domains (Galaxies), projects (Planets), and tasks (Moons). The system allows users to log time against these entities, providing an organized way to manage and analyze professional work.

## Database Schema

### Users Table (Users)
Stores registered users of the system.

Columns:
- user_id (SERIAL PRIMARY KEY) - Unique user ID
- email (VARCHAR(255) UNIQUE NOT NULL) - User email
- password_hash (VARCHAR(255) NOT NULL) - Hashed password
- created_at (TIMESTAMP DEFAULT CURRENT_TIMESTAMP) - Account creation timestamp
- updated_at (TIMESTAMP DEFAULT CURRENT_TIMESTAMP) - Last update timestamp

### Work Domains (Galaxies Table) (Galaxies)
Represents high-level work domains.

Columns:
- galaxy_id (SERIAL PRIMARY KEY) - Unique galaxy ID
- user_id (INT REFERENCES Users(user_id)) - Owner of the work domain
- name (VARCHAR(255) NOT NULL) - Name of the work domain
- description (TEXT) - Optional description
- created_at (TIMESTAMP DEFAULT CURRENT_TIMESTAMP) - Creation timestamp
- updated_at (TIMESTAMP DEFAULT CURRENT_TIMESTAMP) - Last update timestamp

### Projects (Planets Table) (Planets)
Represents projects within a work domain.

Columns:
- planet_id (SERIAL PRIMARY KEY) - Unique planet ID
- galaxy_id (INT REFERENCES Galaxies(galaxy_id)) - Parent work domain
- name (VARCHAR(255) NOT NULL) - Project name
- description (TEXT) - Optional description
- time_spent (INT DEFAULT 0) - Total time spent (in minutes)
- created_at (TIMESTAMP DEFAULT CURRENT_TIMESTAMP) - Creation timestamp
- updated_at (TIMESTAMP DEFAULT CURRENT_TIMESTAMP) - Last update timestamp

### Project Elements (Moons Table) (Moons)
Represents specific work elements under a project.

Columns:
- moon_id (SERIAL PRIMARY KEY) - Unique moon ID
- planet_id (INT REFERENCES Planets(planet_id)) - Parent project
- name (VARCHAR(255) NOT NULL) - Name of the element
- time_spent (INT DEFAULT 0) - Total time spent (in minutes)
- created_at (TIMESTAMP DEFAULT CURRENT_TIMESTAMP) - Creation timestamp
- updated_at (TIMESTAMP DEFAULT CURRENT_TIMESTAMP) - Last update timestamp

### Time Logs Table (TimeLogs)
Records time spent on galaxies, planets, or moons.

Columns:
- time_log_id (SERIAL PRIMARY KEY) - Unique log ID
- user_id (INT REFERENCES Users(user_id)) - User tracking time
- galaxy_id (INT REFERENCES Galaxies(galaxy_id)) - (Optional) Work domain
- planet_id (INT REFERENCES Planets(planet_id)) - (Optional) Project
- moon_id (INT REFERENCES Moons(moon_id)) - (Optional) Task
- time_logged (INT NOT NULL) - Time logged in minutes
- timestamp (TIMESTAMP DEFAULT CURRENT_TIMESTAMP) - Log timestamp

## Features
- Track time spent on work domains, projects, and tasks.
- View logged time in reports.
- Connect with Spotify to start playing music when tracking begins (Upcoming feature).

## Getting Started

### Install Dependencies
npm install

### Set Up Environment Variables
Create a .env.local file and add:
DATABASE_URL=your_postgres_url_here
SPOTIFY_CLIENT_ID=your_spotify_client_id_here
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret_here

### Run Locally
npm run dev

## API Endpoints

### User Authentication (/api/user)
- POST /api/user → Registers a new user.

### Fetch User's Atlas (/api/atlas)
- GET /api/atlas?userId=USER_ID → Fetches work domains, projects, and tasks.

### Log Time (/api/time)
- POST /api/time → Logs time for a galaxy, planet, or moon.

### Get Time Summary (/api/time-summary)
- GET /api/time-summary?userId=USER_ID → Fetches total time spent per entity.

## Future Enhancements
- Detailed time reports with visual analytics.
- Team collaboration support.
- Dark mode UI.

## Contributing
Feel free to open an issue or submit a pull request.

## License
MIT License

## Author
Built by the Atlas Team 🚀
