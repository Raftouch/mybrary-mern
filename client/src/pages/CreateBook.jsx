import { useState } from 'react'
import noImageSelected from '../assets/noImageSelected.jpg'

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
        <p className="pt-28">Book created successfully</p>
      ) : (
        <form className="flex" onSubmit={createBook}>
          <div>
            <label>Upload Thumbnail</label>
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
          <div>
            <div>
              <label>Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              <label>Slug</label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
              />
            </div>
            <div>
              <label>Stars</label>
              <input
                type="text"
                value={stars}
                onChange={(e) => setStars(e.target.value)}
              />
            </div>
            <div>
              <label>Description</label>
              <textarea
                rows="4"
                cols="30"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div>
              <label>Categories (comma-separated)</label>
              <input
                type="text"
                value={categories}
                onChange={handleCategoryChange}
              />
            </div>

            <input
              className="w-full bg-green-950 text-white"
              type="submit"
              value="Create"
            />
          </div>
        </form>
      )}
    </div>
  )
}

export default CreateBook
