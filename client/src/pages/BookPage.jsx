import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function BookPage() {
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/books')
        if (!response.ok) {
          throw new Error('Failed to fetch data')
        }
        const jsonData = await response.json()
        setData(jsonData)
        console.log(jsonData)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [])

  return (
    <div className="pt-28">
      {/* <h1>Books</h1> */}

      <ul className="grid gap-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 justify-items-center mb-10">
        {data.map((item) => (
          <li key={item._id}>
            <Link to={`/books/${item.slug}`}>
              <img
                className="w-[250px] h-[400px]"
                src={`http://localhost:4000/uploads/${item.thumbnail}`}
                alt={item.title}
              />
              <h3 className='text-center font-bold mt-3'>{item.title}</h3>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default BookPage
