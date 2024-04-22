import { createPool } from 'mariadb';
import 'dotenv/config';


export async function connectToMariaDB() {
    try {
        // Tworzenie poola połączeń
        const pool = createPool({
            host: 'variotech.cnye0w4waw7k.eu-central-1.rds.amazonaws.com',
            port: 3306,
            user: 'admin_vt',
            password: '4MJwsjQcP0DWnVXADgEL',
            database: 'sent_forms',
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


