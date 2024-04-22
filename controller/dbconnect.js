import { createPool } from 'mariadb';
import 'dotenv/config';


export async function connectToMariaDB() {
    try {
        // Tworzenie poola połączeń
        const pool = createPool({
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            connectionLimit: 5
        });

        

        // Pobranie połączenia z poola
        const connection = await pool.getConnection();

        console.log('Connected to MariaDB!');

        
        await connection.end();
        
        console.log('Disconnected from MariaDB!');
    } catch (error) {
        console.error('Error connecting to MariaDB:', error);
    }
}

// Wywołanie funkcji
connectToMariaDB();


