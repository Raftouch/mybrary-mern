import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function BookPage() {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [category, setCategory] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = 'http://localhost:4000/api/books'
        if (category) {
          url += `?category=${category}`
        }

        const response = await fetch(url)
        if (!response.ok) {
          throw new Error('Failed to fetch data')
        }
        const jsonData = await response.json()
        setData(jsonData)
        setIsLoading(false)
      } catch (error) {
        console.log(error)
        setError('Error fetching data. Please try again later')
        setIsLoading(false)
      }
    }
    fetchData()
  }, [category])

  return (
    <>
      <div className="h-[80px] z-10 fixed flex items-center gap-5">
        <label className="text-white">Category</label>
        <select
          className="py-2 px-4 rounded-full"
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All</option>
          <option value="fiction">Fiction</option>
          <option value="roman">Roman</option>
          <option value="policier">Policier</option>
          <option value="conte philosophique">Conte philosophique</option>
          <option value="fantasy">Fantasy</option>
          <option value="satire">Satire</option>
          <option value="roman historique">Roman historique</option>
          <option value="other">Other</option>
        </select>
      </div>

      <Link className="pt-28" to="/books/new">
        + Add New Book
      </Link>

      {isLoading ? (
        <p className="pt-28">Data is loading...</p>
      ) : error ? (
        <p className="pt-28">{error}</p>
      ) : (
        <ul className="pt-28 grid gap-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 justify-items-center mb-10">
          {data.map((item) => (
            <li key={item._id}>
              <Link to={`/books/${item.slug}`}>
                <img
                  className="w-[250px] h-[400px]"
                  src={`http://localhost:4000/uploads/${item.thumbnail}`}
                  alt={item.title}
                />
                <h3 className="text-center font-bold mt-3">{item.title}</h3>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  )
}

export default BookPage
