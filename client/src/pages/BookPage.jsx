import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function BookPage() {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/books')
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
  }, [])

  return (
    <>
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
