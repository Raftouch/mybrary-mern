const express = require('express')
const router = express.Router()
const Book = require('../models/book')
const multer = require('multer')

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

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    cb(null, uniqueSuffix + '-' + file.originalname)
  },
})

const upload = multer({ storage: storage })

router.post('/api/books', upload.single('thumbnail'), async (req, res) => {
  try {
    const { title, slug, category, description, stars } = req.body

    const book = new Book({
      title,
      slug,
      category,
      description,
      stars,
      thumbnail: req.file.filename,
    })

    await Book.create(book)

    res.json('Data submitted')
  } catch (error) {
    res.status(500).json({ message: 'Unexpected error occured' })
  }
})

router.put('/api/books', upload.single('thumbnail'), async (req, res) => {
  try {
    const { title, slug, category, description, stars, bookId } = req.body

    const book = {
      title,
      slug,
      category,
      description,
      stars,
    }

    if (req.file) {
      book.thumbnail = req.file.filename
    }

    await Book.findByIdAndUpdate(bookId, book)

    res.json('Book updated')
  } catch (error) {
    res.status(500).json({ message: 'Unexpected error occured' })
  }
})

router.delete('/api/books/:id', async (req, res) => {
  const bookId = req.params.id

  try {
    await Book.deleteOne({ _id: bookId })
    res.json('Book with id' + req.body.bookId + 'was successfully deleted')
  } catch (error) {
    console.log(error)
  }
})

module.exports = router
