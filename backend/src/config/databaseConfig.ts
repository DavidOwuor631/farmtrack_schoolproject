


/*/dotenv.config({path:path.resolve(__dirname,"../../.env")})
// dotenv.config({path:path.resolve(__filename,".env")}) -> try this later

// strong type this later on...
export const mysqlConfig = {
    user : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_NAME,
    server : process.env.DB_SERVER || 'localhost',
    port: Number(process.env.DB_PORT) || 1433,
    pool : {
        min : 0,
        max : 10,
        idleTimeoutMillis : 30000,
    },
    options : {
        //encrypt : true,
       trustServerCertificate: true,
        integratedSecurity: true
    
    }
}
// db.ts8*/
/*import dotenv from 'dotenv';
import mysql, { Pool } from 'mysql2/promise';

// Load environment variables
dotenv.config();

// Create a MySQL connection pool
const pool: Pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

export default pool;
*/

import { Sequelize, Dialect } from 'sequelize';

// First configuration (from the original file)
const sequelize = new Sequelize(
    process.env.DB_NAME || 'farmtrack', // Environment variable or fallback
    process.env.DB_USER || 'root',
    process.env.DB_PASSWORD || 'Gliese581*',
    {
        host: process.env.DB_HOST || '127.0.0.1',
        dialect: (process.env.DB_DIALECT as Dialect) || 'mysql',
        logging: false,
    }
);

// Second configuration (from the new file)
const db = new Sequelize(
    'farmtrack', // Replace with your actual database name
    'root',      // Replace with your actual username
    'Gliese581*',      // Replace with your actual password
    {
        host: 'localhost',
        dialect: 'mysql', // Adjust this to your database type
    }
);

// Test connection for `sequelize`
sequelize
    .authenticate()
    .then(() => {
        console.log('Database connection established successfully for `sequelize`.');
    })
    .catch((error) => {
        console.error('Unable to connect to the database with `sequelize`:', error);
    });

// Test connection for `db`
db.authenticate()
    .then(() => {
        console.log('Database connection established successfully for `db`.');
    })
    .catch((error) => {
        console.error('Unable to connect to the database with `db`:', error);
    });

export { sequelize }; // Optional: export `sequelize` for cases where you still need it
export default db; // Export `db` as the default configuration


