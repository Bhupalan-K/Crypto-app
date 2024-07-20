import React, { useContext, useEffect, useRef, useState } from 'react'
import './Coin.css'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { CoinContext } from '../../context/CoinContext';
import LineChart from '../../components/charts/LineChart';
import BarChart from '../../components/charts/BarChart';
import PieChart from '../../components/charts/PieChart';

const Coin = () => {

  const { coinId } = useParams();
  const navigate = useNavigate()
  const [data, setData] = useState()
  const [pastData, setPastData] = useState()
  const { coins, currency } = useContext(CoinContext);
  const [chartValue, setChartValue] = useState({ value: 'linechart' })
  const menuRef = useRef(null);

  const nextButton = () => {
    const curIndex = coins.findIndex((coin) => coin.id === coinId);
    const nexIndex = (curIndex + 1) % coins.length;
    const index = coins[nexIndex].id;
    navigate(`/coin/${index}`)
  }
  const prevButton = () => {
    const curIndex = coins.findIndex((coin) => coin.id === coinId);
    const nexIndex = (curIndex - 1) % coins.length;
    const index = coins[nexIndex].id;
    navigate(`/coin/${index}`)
  }

  const fetchData = async () => {
    const options = {
      method: 'GET',
      headers: { accept: 'application/json', 'x-cg-demo-api-key': 'CG-anrPktdYPUMGWjXSD9Jopvxw' }
    };

    fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`, options)
      .then(response => response.json())
      .then(response => setData(response))
      .catch(err => console.error(err));
  }

  const fetchPastData = async () => {
    const options = {
      method: 'GET',
      headers: { accept: 'application/json', 'x-cg-demo-api-key': 'CG-anrPktdYPUMGWjXSD9Jopvxw' }
    };

    fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=10&interval=daily`, options)
      .then(response => response.json())
      .then(response => setPastData(response))
      .catch(err => console.error(err));
  }

  useEffect(() => {
    fetchData()
    fetchPastData()
  }, [currency, coinId])

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
    data && pastData ? (
      <div className='coin'>
        <ul className='sidemenu' ref={menuRef}>
          <li className='first' onClick={removeSidemenu}><i class="fas fa-times" /></li>
          <Link to="/"><li>Home</li></Link>
          <Link to='/about'><li>About Me</li></Link>
          <Link to='/cryptoInfo'><li>Crypto Info</li></Link>

        </ul>
        <div className="coin-menu">
          <Link to='/'><i className="fa-solid fa-arrow-left" /></Link>
          <i class="fa-solid fa-bars" onClick={displaySidemenu} />
        </div>
        <div className='coin-name'>
          <img src={data.image.large} alt="" />
          <p><b>{data.name}({data.symbol.toUpperCase()})</b></p>
        </div>
        <div className='chart-options'>
          <div>
            <p onClick={prevButton}><i className="fa-solid fa-chevron-left" /><span>Prev</span></p>
            <select value={chartValue} onChange={e => setChartValue({ value: e.target.value })} className='chart-option'>
              <option value="linechart">Line Chart</option>
              <option value="barchart">Bar Chart</option>
              <option value="piechart">Pie Chart</option>
            </select>
            <p className='right-arrow' onClick={nextButton}><span >Next</span><i className="fa-solid fa-chevron-right" /></p>
          </div>
        </div>
        <div className="charts">
          {chartValue.value === 'linechart' && <LineChart pastData={pastData} />}
          {chartValue.value === 'barchart' && <BarChart pastData={pastData} />}
          {chartValue.value === 'piechart' && <PieChart pastData={pastData} />}
        </div>
        <div className="coin-info">
          <ul>
            <li>Crypto Market Rank</li>
            <li>{data.market_cap_rank}</li>
          </ul>
          <ul>
            <li>Current Price</li>
            <li>{currency.symbol} {data.market_data.current_price
            [currency.name].toLocaleString()}</li>
          </ul>
          <ul>
            <li>Market Cap</li>
            <li>{currency.symbol} {data.market_data.market_cap
            [currency.name].toLocaleString()}</li>
          </ul>
          <ul>
            <li>24 Hour High</li>
            <li>{currency.symbol} {data.market_data.high_24h
            [currency.name].toLocaleString()}</li>
          </ul>
          <ul>
            <li>24 Hour Low</li>
            <li>{currency.symbol} {data.market_data.low_24h
            [currency.name].toLocaleString()}</li>
          </ul>
          <ul>
            <li>1 Hour Change</li>
            <li>{currency.symbol} {data.market_data.price_change_percentage_1h_in_currency
            [currency.name].toLocaleString()}</li>
          </ul>
        </div>
      </div>) : (
      <div className="spinner">
        <div className="spin"></div>
      </div>
    )

  )
}

export default Coin