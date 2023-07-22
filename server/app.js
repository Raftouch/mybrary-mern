const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()
const cors = require('cors')
const mongoUrl = process.env.MONGO_URL
const port = process.env.PORT || 4444

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/', (req, res) => {
  res.json('Hello mate')
})

async function start() {
  try {
    await mongoose.connect(mongoUrl)
    app.listen(port, () => console.log(`App listening on port ${port}`))
    console.log('Connected to DB')
  } catch (error) {
    console.log('Server Error', error)
    process.exit(1)
  }
}

start()
