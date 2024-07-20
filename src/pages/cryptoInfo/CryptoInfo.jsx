import React, { useContext, useRef } from 'react'
import './CryptoInfo.css'
import { Link } from 'react-router-dom';
import { CoinContext } from '../../context/CoinContext';

const CryptoInfo = () => {

  const { coins } = useContext(CoinContext)
  const menuRef = useRef(null);

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
    <div className='crypto'>
      <ul className='sidemenu' ref={menuRef}>
        <li className='first' onClick={removeSidemenu}><i class="fas fa-times" /></li>
        <Link to="/"><li>Home</li></Link>
        {coins && coins.length > 0 && (
          <Link to={`/coin/${coins[0].id}`}><li>Charts</li></Link>
        )}
        <Link to='/about'><li>About Me</li></Link>
      </ul>
      <div className="crypto-menu">
        <Link to='/'><i className="fa-solid fa-arrow-left" /></Link>
        <i className="fa-solid fa-bars" onClick={displaySidemenu} />
      </div>
      <div className="intro">
        <h2>Crypto Info</h2>
        <p>Cryptocurrency is a type of digital or virtual
          currency that uses cryptography for security.
          Unlike traditional currencies issued by governments
          (fiat currencies), cryptocurrencies operate on technology
          called blockchain, which is a decentralized ledger of all
          transactions across a network of computers. Cryptocurrencies are
          typically decentralized, meaning they are not controlled by a
          central authority like a bank or government. Instead, they rely on
          a network of nodes (computers) to validate and record transactions.</p>
      </div >
      <div className='hedings-div'>
        <p className='heading'>Popular Currencies</p>
        <p className='side-heading'>Bitcoin (BTC)</p>
        <p>The first and most well-known cryptocurrency, created by an anonymous
          person (or group) known as Satoshi Nakamoto in 2009. Bitcoin operates on
          a decentralized network using blockchain technology. This means it is not
          controlled by any single entity, such as a government or financial
          institution. Often referred to as "digital gold," Bitcoin is considered
          by many as a store of value and a hedge against inflation, similar to precious metals.</p>
        <p className='side-heading'>Ethereum (ETH)</p>
        <p>Ethereum Known for its smart contract functionality, allowing developers to
          build decentralized applications (dApps) on its blockchain. Ethereum was
          proposed by Vitalik Buterin in late 2013 and development began in early 2014.
          The network went live on July 30, 2015. A Swiss nonprofit organization, the
          Ethereum Foundation, was established to oversee the development of Ethereum and its ecosystem.</p>
        <p className='side-heading'>Ripple (XRP)</p>
        <p>Ripple (XRP) is a digital payment protocol and cryptocurrency that focuses on facilitating
          fast and low-cost international money transfers. Here are some important points crypto Ripple
          and its native cryptocurrency, XRP Ripple aims to enable secure, instant, and nearly free
          global financial transactions of any size with no chargebacks. It is designed to facilitate
          cross-border payments for financial institutions.</p>
        <p className='side-heading'>Litecoin (LTC)</p>
        <p>Litecoin was created by Charlie Lee in October 2011. Litecoin's faster block generation
          time results in quicker confirmation times for transactions. Transaction fees on the
          Litecoin network are generally lower compared to Bitcoin, making it more cost-effective
          for smaller transactions. Litecoin is often referred to as the "silver to Bitcoin's
          gold," emphasizing its role as a complementary cryptocurrency rather than a competitor.</p>
        <p className='side-heading'>Bitcoin Cash (BCH)</p>
        <p>Bitcoin Cash (BCH) is a cryptocurrency that was created as a fork of Bitcoin (BTC) in 2017.
          Here are some important points crypto Bitcoin Cash. The main reason for the fork was to
          address Bitcoin's scalability issues, specifically the size of blocks and transaction speeds.
          Due to larger block sizes, Bitcoin Cash can handle more transactions per second compared to
          Bitcoin.
        </p>
      </div>
    </div>
  )
}

export default CryptoInfo