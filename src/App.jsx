import React, { useRef, useState } from 'react'
import Nav from './nav/Nav'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/home/Home'
import Coin from './pages/coin/Coin'
import CryptoInfo from './pages/cryptoInfo/CryptoInfo'
import About from './pages/about/About'
import Footer from './components/footer/Footer'

const App = () => {

  const colorMode = useRef(null);
  const [icon, setIcon] = useState(true);

  const lightMode = () => {
    if (colorMode.current) {
      colorMode.current.className = 'app-light';
      setIcon(true);
    }
  }

  const darkMode = () => {
    if (colorMode.current) {
      colorMode.current.className = 'app-dark';
      setIcon(false);
    }
  }

  return (
    <div className='app-light' ref={colorMode}>
      <Nav
        lightMode={lightMode}
        darkMode={darkMode}
        icon={icon}
      />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/coin/:coinId' element={<Coin />} />
        <Route path='/cryptoInfo' element={<CryptoInfo />} />
        <Route path='/about' element={<About />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App