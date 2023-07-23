const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()
const cors = require('cors')
const mongoUri = process.env.MONGO_URI
const port = process.env.PORT || 4000

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
)
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use('/uploads', express.static('uploads'))

app.use('/', require('./routes/book'))

async function start() {
  try {
    await mongoose.connect(mongoUri)
    app.listen(port, () => console.log(`App listening on port ${port}`))
    console.log('Connected to DB')
  } catch (error) {
    console.log('Server Error', error)
    process.exit(1)
  }
}

start()
