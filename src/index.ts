import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import { connection } from './db/connection'


const app = express()


// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())


async function initDB() {
  try {
    // creating enum type
    await connection.query(`
      DO $$ BEGIN 
        IF NOT EXISTS (SELECT FROM pg_type WHERE typname = 'user_role') THEN
          CREATE TYPE user_role AS ENUM ('jobseeker', 'employer');
        END IF;
      END $$;
    `);

    // creating users table. if user is a job seeker he needs to send the bio and resume
    await connection.query(`
      CREATE TABLE IF NOT EXISTS users(
        user_id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        phone VARCHAR(255) NOT NULL,
        role user_role NOT NULL,
        bio TEXT, 
        resume VARCHAR(255),
        resume_public_id VARCHAR(255),
        profile_picture VARCHAR(255) NOT NULL,
        profile_picture_public_id VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
      )
    `);

    //skill table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS skills(
        skill_id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL UNIQUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
      )
    `);

    //match and show skill as array
    await connection.query(`
      CREATE TABLE IF NOT EXISTS user_skills(
        user_id INTEGER NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
        skill_id INTEGER NOT NULL REFERENCES skills(skill_id),
        PRIMARY KEY (user_id, skill_id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
      )
    `);
    
    console.log('Tables initialized successfully');
  } catch (err) {
    console.error('Error creating tables', err);
  }
}


app.listen(process.env.PORT, async () => {
  console.log(`Hello world app listening on port ${process.env.PORT}!`)
  try {
    await connection.query('SELECT 1')
    console.log('database connected')
    await initDB()
  } catch (err) {
    console.error('database connection failed', err)
  }
})
