import { Pool } from 'pg';
import dotenv from 'dotenv';



dotenv.config();

const queryClient = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,
    },
});

export const connection = queryClient; // Export pool for connectivity checks
