import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

function DetailsPage() {
  const [data, setData] = useState([])
  const urlSlug = useParams()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/api/books/${urlSlug.slug}`
        )
        if (!response.ok) {
          throw new Error('Failed to fetch data')
        }
        const jsonData = await response.json()
        setData(jsonData)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [urlSlug.slug])

  function StarRating(prop) {
    let { numberOfStars } = prop
    const stars = []

    for (let i = 0; i < numberOfStars; i++) {
      stars.push(<span key={i}>&#11088;</span>)
    }
    return <div>Rating: {stars}</div>
  }

  return (
    <>
      <div className="pt-32 flex flex-wrap gap-10 justify-center mb-10">
        <img
          className="w-[312px] h-[500px]"
          src={`http://localhost:4000/uploads/${data.thumbnail}`}
          alt={data.title}
        />

        <div className="flex flex-col gap-3 justify-between max-w-[500px]">
          <div className="flex flex-col gap-3">
            <h1 className="uppercase font-bold">{data.title}</h1>
            <p>{data.description}</p>
            <StarRating numberOfStars={data.stars} />
            <p>Category:</p>
            <ul>
              {data.category?.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="flex mt-2 gap-10 ml-auto">
            <Link className="py-2 px-4 bg-green-950 text-white" to="/books">
              Back
            </Link>
            <Link
              className="py-2 px-4 bg-amber-600 text-white"
              to={`/books/edit/${data.slug}`}
            >
              Edit
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default DetailsPage
