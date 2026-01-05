import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';
import dotenv from 'dotenv';



dotenv.config();

const queryClient = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,
    },
});

export const db = drizzle(queryClient, { schema });
export const connection = queryClient; // Export pool for connectivity checks
