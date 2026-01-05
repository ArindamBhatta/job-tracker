import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import { connection } from './db/connection'

const app = express()


// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())


app.listen(process.env.PORT, async () => {
  console.log(`Hello world app listening on port ${process.env.PORT}!`)
  try {
    await connection.query('SELECT 1')

    console.log('database connected')
  } catch (err) {
    console.error('database connection failed', err)
  }
})
