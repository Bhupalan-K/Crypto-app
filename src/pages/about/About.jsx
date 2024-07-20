import React, { useContext, useRef } from 'react'
import './About.css'
import { CoinContext } from '../../context/CoinContext'
import { Link } from 'react-router-dom';

const About = () => {

    const { coins } = useContext(CoinContext);
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
        <div className='about'>
            <ul className='sidemenu' ref={menuRef}>
                <li className='first' onClick={removeSidemenu}><i class="fas fa-times" /></li>
                <Link to="/"><li>Home</li></Link>
                {coins && coins.length > 0 && (
                    <Link to={`/coin/${coins[0].id}`}><li>Charts</li></Link>
                )}
                <Link to='/cryptoInfo'><li>Crypto Info</li></Link>
            </ul>
            <div className="about-menu">
                <Link to='/'><i className="fa-solid fa-arrow-left" /></Link>
                <i className="fa-solid fa-bars" onClick={displaySidemenu} />
            </div>
            <div className="about-div">
                <h2>About</h2>
                <p>Crypto Tracker help's to keep track of the latest prices and
                    trends in the cryptocurrency market. User can track real-time
                    updates like marketrank, current price, changes in market prices
                    per day, per hour etc. Also prices can be viewed in charts up's
                    and down's in prices. Developed using technologies like React,
                    Javascript, HTML, CSS with responsive design.</p>

            </div>
            <div className="learnings">
                <hr></hr>
                <p className='first'>My Learnings In this Project</p>
                <p className='headings'>React</p>
                <p className='points'>
                    In React I learned about Hooks, States, Routing, Components, Props and
                    make website dynamically run.
                </p>
                <p className='headings'>HTML & CSS</p>
                <p className='points'>
                    Learned to develop a responsive and user friendly website using HTML &
                    CSS. Improved my designing skills.
                </p>
                <p className='headings'>API Fetching</p>
                <p className='points'>Learned to fetch data from the API's and process according
                    to promises and make responsive to users.
                </p>
            </div>
        </div>
    )
}

export default About