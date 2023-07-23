import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

function App() {
  return (
    <div className="flex flex-col items-center min-h-screen bg-green-50">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  )
}

export default App
