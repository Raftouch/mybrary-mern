import { useEffect, useState } from 'react'
// import noImageSelected from '../assets/noImageSelected.jpg'
import { useNavigate, useParams } from 'react-router-dom'

function EditBook() {
  const navigate = useNavigate()
  const urlSlug = useParams()
  const baseUrl = `http://localhost:4000/api/books/${urlSlug.slug}`

  const [bookId, setBookId] = useState('')
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [stars, setStars] = useState(0)
  const [description, setDescription] = useState('')
  const [categories, setCategories] = useState([])
  const [thumbnail, setThumbnail] = useState(null)
  const [submitted, setSubmitted] = useState('')
  const [image, setImage] = useState('')

  // fetch data in order to populate all fields
  const fetchData = async () => {
    try {
      const response = await fetch(baseUrl)

      if (!response.ok) {
        throw new Error('Failed to fetch data')
      }

      const data = await response.json()
      setBookId(data._id)
      setTitle(data.title)
      setSlug(data.slug)
      setStars(data.stars)
      setDescription(data.description)
      setCategories(data.category)
      setThumbnail(data.thumbnail)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  async function editBook(e) {
    e.preventDefault()

    const formData = new FormData()
    formData.append('bookId', bookId)
    formData.append('title', title)
    formData.append('slug', slug)
    formData.append('stars', stars)
    formData.append('description', description)
    formData.append('category', categories)

    if (thumbnail) {
      formData.append('thumbnail', thumbnail)
    }

    try {
      const response = await fetch('http://localhost:4000/api/books', {
        method: 'PUT',
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

  async function removeBook(e) {
    e.preventDefault()

    try {
      const response = await fetch(
        'http://localhost:4000/api/books/' + bookId,
        {
          method: 'DELETE',
        }
      )

      if (response.ok) {
        navigate('/books')
        console.log('Book removed')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="pt-28">
      <h1 className="text-center mb-10">EditBook</h1>

      <button className="py-2 px-4 bg-red-600 text-white" onClick={removeBook}>
        Delete Book
      </button>

      {submitted ? (
        <p className="pt-28">Book updated successfully</p>
      ) : (
        <form className="flex" onSubmit={editBook}>
          <div>
            <label>Upload Thumbnail</label>

            {image ? (
              <img
                className="w-[250px] h-[400px]"
                src={`${image}`}
                alt="preview image"
              />
            ) : (
              <img
                className="w-[250px] h-[400px]"
                src={`http://localhost:4000/uploads/${thumbnail}`}
                alt="preview image"
              />
            )}

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
              value="Edit"
            />
          </div>
        </form>
      )}
    </div>
  )
}

export default EditBook
