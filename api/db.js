import { createPool } from "mysql2/promise";
import { config } from "dotenv";

config();

const pool = createPool({
    port: process.env.MYSQL_PORT,
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    database: process.env.MYSQL_DATABASE,
    password: process.env.MYSQL_PASSWORD
})

const connectToDatabase = async () => {
    try {
        await pool.getConnection();
        console.log("Database connected successfully");
    } catch (error) {
        console.log("Database connection failed:", error);
        throw error;
    }
};

export { pool, connectToDatabase };