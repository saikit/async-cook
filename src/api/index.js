import express from 'express';
import appRouter from './routes.js';
import { connectToDatabase } from './db.js';
import cors from 'cors';
const app = express();
app.use(cors({ origin: 'http://localhost:5173' }));

// Middleware to parse JSON bodies

app.use(express.json());

app.use("/api/recipes", appRouter);

const PORT = process.env.PORT || 3000;


connectToDatabase().then(() => {
    app.listen(PORT, () => console.log("Server open at port:", PORT));
}).catch((error) => {
    console.error("Failed to start server due to database connection error:", error);
    process.exit(0);
});