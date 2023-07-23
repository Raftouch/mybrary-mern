import book from '../assets/book.png'
import { Link, NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="fixed w-full h-[80px] bg-green-950 text-white flex justify-between px-5 items-center">
      <Link to="/">
        <img className='w-[80px]' src={book} alt="book image" />
      </Link>
      <span className="flex gap-5">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/books">Books</NavLink>
        <NavLink to="/about">About</NavLink>
      </span>
    </nav>
  )
}

export default Navbar
