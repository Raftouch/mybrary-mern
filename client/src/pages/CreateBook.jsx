import { useState } from 'react'
import noImageSelected from '../assets/noImageSelected.jpg'
import { Link } from 'react-router-dom'

function CreateBook() {
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [stars, setStars] = useState(0)
  const [description, setDescription] = useState('')
  const [categories, setCategories] = useState([])
  const [thumbnail, setThumbnail] = useState(null)
  const [submitted, setSubmitted] = useState('')
  const [image, setImage] = useState(noImageSelected)

  async function createBook(e) {
    e.preventDefault()

    const formData = new FormData()
    formData.append('title', title)
    formData.append('slug', slug)
    formData.append('stars', stars)
    formData.append('description', description)
    formData.append('category', categories)
    formData.append('thumbnail', thumbnail)

    try {
      const response = await fetch('http://localhost:4000/api/books', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        setTitle('')
        setSlug('')
        setSubmitted(true)
      } else {
        console.log('Failed to submit data')
      }
    } catch (error) {
      console.log(error)
    }
  }

  function handleCategoryChange(e) {
    setCategories(e.target.value.split(',').map((category) => category.trim()))
  }

  function onImageChange(e) {
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]))
      setThumbnail(e.target.files[0])
    }
  }

  return (
    <div className="pt-28">
      <h1 className="text-center mb-10">CreateBook</h1>

      {submitted ? (
        <div className="flex flex-col">
          <p className="pt-10 mb-10">Book created successfully</p>
          <Link
            className="text-center py-2 px-4 bg-green-950 text-white"
            to="/books"
          >
            Go back to books
          </Link>
        </div>
      ) : (
        <form
          className="flex flex-wrap gap-10 justify-center mb-10"
          onSubmit={createBook}
        >
          <div>
            <img
              className="w-[250px] h-[400px]"
              src={image}
              alt="preview image"
            />
            <input
              onChange={onImageChange}
              type="file"
              accept="image/jpg, image/jpeg, image/png, image/gif"
            />
          </div>
          <div className="flex flex-col gap-3 justify-between">
            <div className="flex flex-col gap-3">
              <div className="flex justify-between">
                <label>Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="flex justify-between">
                <label>Slug</label>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                />
              </div>
              <div className="flex justify-between">
                <label>Stars</label>
                <input
                  type="text"
                  value={stars}
                  onChange={(e) => setStars(e.target.value)}
                />
              </div>
              <div className="flex flex-col">
                <label>Description</label>
                <textarea
                  rows="4"
                  cols="30"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="flex flex-col">
                <label>Categories (comma-separated)</label>
                <input
                  type="text"
                  value={categories}
                  onChange={handleCategoryChange}
                />
              </div>
            </div>

            <div className="flex mt-2 gap-10 ml-auto">
              <input
                className="py-2 px-4 ml-auto bg-green-600 text-white"
                type="submit"
                value="Create"
              />
              <Link className="py-2 px-4 bg-green-950 text-white" to="/books">
                Cancel
              </Link>
            </div>
          </div>
        </form>
      )}
    </div>
  )
}

export default CreateBook
