import React from 'react';
import '../css/PopUp.css'
import '../css/CrossComponent.css'


const Popup = ({ setShowPopup }) => {
    const closePopup = () => setShowPopup(false);

    return (
        <>
            <div className='background' onClick={closePopup}></div>
            <div className="popup">
                <div className='header'>
                    <h3>
                        👋 Bienvenue sur mon site portfolio !
                    </h3>
                    <div className='close-inside' onClick={closePopup}></div>
                </div>
                <div className='body'>
                    <p>
                        Je vous souhaite la bienvenue sur mon site portfolio !
                    </p>
                    <p>
                        Vous retrouverez ici mes réalisations ainsi qu'une page pour me contacter.
                    </p>
                    <p>
                        Ce site est en constante évolution. Il subira de régulières mises à jours donc n'hésitez pas à revenir plus tard pour constater les nouveautés.  <span className='whisper'>*j'ai déjà pleins d'idées*</span>
                    </p>
                    <p>
                        Bonne visite !
                    </p>
                </div>
                <div className='footer d-vh-center'>
                    <button className='rounded' onClick={closePopup}>Compris !</button>
                </div>
            </div>
        </>
    );
};

export default Popup;
