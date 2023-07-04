import './css/HomePage.css'
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import React, { useEffect } from 'react';
import Popup from './components/PopUp';

export default function HomePage() {

    const [showPopup, setShowPopup] = React.useState(false);

    useEffect(() => {
        const firstVisit = Cookies.get('firstVisit');

        if (!firstVisit) {
            setShowPopup(true);
            Cookies.set('firstVisit', 'true', { expires: 14 }); // Le cookie expirera après 1 an
        }
    }, []);

    return (
        <>
            {showPopup && <Popup setShowPopup={setShowPopup} />}
            <div className="card">
                <h1 className="intro-sentence">
                    Je suis <strong className='blue-text'>mathis viollet</strong>, <br />developpeur web.
                </h1>
                <ul className="menu-list">
                    <li><Link to="/projects">voir mes projets</Link></li>
                    <li><Link to="/profile">à propos</Link></li>
                    <li><Link to="/contact">me contacter</Link></li>
                </ul>
            </div >
        </>
    )
}
