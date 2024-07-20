import React, { useContext } from 'react'
import './Nav.css'
import logo from '../assets/logo.png'
import darkIcon from '../assets/darkIcon.png'
import lightIcon from '../assets/lightIcon.png'
import { CoinContext } from '../context/CoinContext'
import { Link } from 'react-router-dom'

const Nav = ({ lightMode, darkMode, icon }) => {

  const { coins, setCurrency } = useContext(CoinContext)

  const currencyHandler = (e) => {
    switch (e.target.value) {
      case "usd": {
        setCurrency({ name: "usd", symbol: "$" });
        break;
      }
      case "eur": {
        setCurrency({ name: "eur", symbol: "€" });
        break;
      }
      case "inr": {
        setCurrency({ name: "inr", symbol: "₹" });
        break;
      }
      default: {
        setCurrency({ name: "usd", symbol: "$" });
        break;
      }
    }
  }

  return (
    <div className='navbar'>
      <div className='logo-div'>
        <Link to="/">
          <img src={logo} alt="" className='logo' />
        </Link>
        <h2>CRYPTO</h2>
      </div>
      <ul>
        <Link to="/"><li>Home</li></Link>
        {coins && coins.length > 0 && (
          <Link to={`/coin/${coins[0].id}`}><li>Charts</li></Link>
        )}
        <Link to='/about'><li>About Me</li></Link>
        <Link to='/cryptoInfo'><li>Crypto Info</li></Link>
      </ul>
      <div className="nav-right">
        <select onChange={currencyHandler}>
          <option value="usd" className='option'>USD</option>
          <option value="eur" className='option'>EUR</option>
          <option value="inr" className='option'>INR</option>
        </select>
        {icon ? (<img src={darkIcon} alt="" className='dark-icon' onClick={darkMode} />) :
          (<img src={lightIcon} alt="" className='light-icon' onClick={lightMode} />)
        }
      </div>
    </div>
  )
}

export default Nav