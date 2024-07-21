import React, { useContext, useEffect, useRef, useState } from 'react'
import './Home.css'
import { CoinContext } from '../../context/CoinContext'
import { Link } from 'react-router-dom';

const Home = () => {

  const { coins, currency } = useContext(CoinContext);
  const [displayCoins, setDisplayCoins] = useState([])
  const [search, setSearch] = useState('');
  const menuRef = useRef(null);

  useEffect(() => {
    setDisplayCoins(coins)
  }, [coins])

  const handleSearch = async (e) => {
    e.preventDefault();
    const filteredCoins = await coins.filter(coin => coin.name.toLowerCase().includes(search.toLowerCase())).slice(0, 10);
    setDisplayCoins(filteredCoins)
  }

  const handleInputChange = (e) => {
    setSearch(e.target.value);
    if (e.target.value === "") {
      setDisplayCoins(coins)
    }
  }

  const displaySidemenu = () => {
    if (menuRef.current) {
      menuRef.current.style.right = '0';
    }
  }
  const removeSidemenu = () => {
    if (menuRef.current) {
      menuRef.current.style.right = '-200px';
    }
  }

  return (
    <div className='home'>
      <ul className='sidemenu' ref={menuRef}>
        <li className='first' onClick={removeSidemenu}><i class="fas fa-times" /></li>
        {coins && coins.length > 0 && (
          <Link to={`/coin/${coins[0].id}`}><li>Charts</li></Link>
        )}
        <Link to='/about'><li>About Me</li></Link>
        <Link to='/cryptoInfo'><li>Crypto Info</li></Link>
      </ul>
      <div className='bars'>
        <i class="fa-solid fa-bars" onClick={displaySidemenu} />
      </div>
      <div className="content">
        <h1>Crypto Tracker !</h1>
        <p>Welcome to Crypto Tracker,
          The Future of Money is Digital. Embrace It<br/>
          <span>(Click on Table Coins to see Prices in {coins && coins.length > 0 && (
          <Link to={`/coin/${coins[0].id}`}><span>Charts</span></Link>
        )})</span>
        </p>
        <form onSubmit={handleSearch} >
          <input type='text' placeholder='Search cryptos'
            value={search} onChange={handleInputChange} list='coinlist' />
          <datalist id='coinlist' className='coinlist'>
            {coins.map((item, index) => (<option value={item.name} key={index} />))}
          </datalist>
          <button type='submit'>Search</button>
        </form>
      </div>
      <div className="table">
        <div className="table-items">
          <p>Rank</p>
          <p>Coins</p>
          <p>Price</p>
          <p>24H Change</p>
          <p>Market Cap</p>
        </div>
        {displayCoins.filter(displayCoin => displayCoin.name.toLowerCase().includes(search.toLowerCase()))
          .slice(0, 10).map((item, index) => (
            <Link to={`/coin/${item.id}`} className="table-items" key={index}>
              <p>{item.market_cap_rank}</p>
              <div>
                <img src={item.image} alt="" />
                <p>{item.name + " - " + item.symbol}</p>
              </div>
              <p>{currency.symbol}{item.current_price.toLocaleString()}</p>
              <p className={item.price_change_percentage_24h > 0 ? 'green' : 'red'}>
                {Math.floor(item.price_change_percentage_24h * 100) / 100}</p>
              <p>{currency.symbol}{item.market_cap.toLocaleString()}</p>
              <p className='popup'>Click to see in chart</p>
            </Link>
          ))
        }
      </div>
    </div>
  )
}

export default Home