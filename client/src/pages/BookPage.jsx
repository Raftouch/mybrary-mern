import { useEffect, useState } from 'react'

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
      <h1>Books</h1>

      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}

export default BookPage
