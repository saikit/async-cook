import { pool } from "./db.js";

export const find = async () => {
    const QUERY = "SELECT * FROM recipes";
    try {
        const client = await pool.getConnection();
        const result = client.query(QUERY);
        console.log(result);
        return result;
    } catch (error) {
        console.error("Error executing query:", error);
        throw error;
    }
}

export const findBySlug = async (slug) => {
    const QUERY = "SELECT * FROM recipes WHERE slug= ?";
    try {
        const client = await pool.getConnection();
        const result = client.query(QUERY, [slug]);
        console.log(result);
        return result;
    } catch (error) {
        console.error("Error finding recipe:", error);
        throw error;
    }
}