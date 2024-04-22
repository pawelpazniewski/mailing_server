import { createPool } from 'mariadb';
import 'dotenv/config';


export async function connectToMariaDB(data) {
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

        const dbdata = data;
        const query = `
        INSERT INTO sent_forms (date, email, phone, subject, message)
        VALUES (?,?,?,?,?)
    `
    const date = new Date();
    const timestamp = date.getTime();

    const dateTime = new Date(timestamp);
    const formattedDate = dateTime.toLocaleString();    

    async function insertData() {
        let conn;
        try {
            conn = await pool.getConnection();
            await conn.query(query, [
                formattedDate,
                dbdata.email,
                dbdata.phone,
                dbdata.subject,
                dbdata.message
            ]);
            console.log('New entry inserted into the database!');
        } catch (error) {
            console.error('Error inserting data:', error);
        } finally {
            if (conn) {
                // Zakończenie połączenia
                conn.end();
            }
        }
    }
    
    // Wywołanie funkcji do wstawiania danych
   
        // Pobranie połączenia z poola
        const connection = await pool.getConnection();

        console.log('Connected to MariaDB!');
       

// Wywołanie funkcji do wstawiania danych
    insertData();
        
        await connection.end();
        
        console.log('Disconnected from MariaDB!');
    } catch (error) {
        console.error('Error connecting to MariaDB:', error);
    }
}





