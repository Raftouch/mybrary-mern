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

    const books = await Book.find(filter)
    res.json(books)
  } catch (error) {
    res.status(500).json({ message: 'Unexpected error occured' })
  }
})

router.get('/api/books/:slug', async (req, res) => {
  try {
    const book = await Book.findOne({ slug: req.params.slug })
    res.json(book)
  } catch (error) {
    res.status(500).json({ message: 'Unexpected error occured' })
  }
})

module.exports = router
