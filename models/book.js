const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
  },
  category: {
    type: Array,
  },
  description: {
    type: String,
  },
  stars: {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  thumbnail: {
    type: String,
  },
})

module.exports = mongoose.model('Book', bookSchema)
