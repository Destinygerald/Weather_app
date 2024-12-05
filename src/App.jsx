import './App.css'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { HiOutlineMenuAlt1 } from 'react-icons/hi'
import Homepage from './pages/home/Page.jsx'
import Mainpage from './pages/main/Page.jsx'
import { Navbar } from './Navbar.jsx'
import { LocationContextProvider } from './context/LocationContext.jsx'



function App() {

  return (
    <div className='app'>
      <LocationContextProvider>

        {/*<Navbar />*/}

        <Routes>  
          <Route path='/' element={<Homepage />} />
          <Route path='*' element={<Homepage />} />
          <Route path='/weather' element={<Mainpage />} />
        </Routes>

      </LocationContextProvider>
    </div>
  )
}

export default App
