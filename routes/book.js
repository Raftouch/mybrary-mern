const express = require('express')
const router = express.Router()
const Book = require('../models/book')

router.get('/', (req, res) => {
  res.json('Hello mate')
})

router.get('/api/books', async (req, res) => {
  try {
    const category = req.query.category
    const filter = {}
    if (category) {
      filter.category = category
    }

    const data = await Book.find(filter)
    res.json(data)
  } catch (error) {
    res.status(500).json({ message: 'Unexpected error occured' })
  }
})

module.exports = router
