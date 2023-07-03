import './css/ProfilePage.css';
import CrossComponent from './components/CrossComponent';
import React, { useEffect, useRef } from 'react';

export default function ProfilePage() {
    const imgRef = useRef();

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const src = img.getAttribute('data-src');
                    img.setAttribute('src', src);
                    img.classList.add('fade');

                    observer.disconnect();
                }
            });
        });

        observer.observe(imgRef.current);

        return () => observer.disconnect();

    }, []);

    return (
        <>
            <CrossComponent />
            <div className='container'>
                <h1>A PROPOS DE MOI</h1>
                <div className='profile-container'>
                    <div className='profile-image-container'>
                        <img ref={imgRef}
                            data-src={'https://res.cloudinary.com/dau53hmfi/image/upload/v1688409611/IMG_3755_resized_3aeea965c5.webp'}
                            alt={'profile_pic'}
                            className='lazy-image' />
                    </div>
                    <div className='profile-informations'>
                        <div className='profile-description'>
                            <p>Je m’appelle Mathis Viollet, je suis suis un développeur web passionné par l’univers de l’informatique.</p>
                            <p>Je suis étudiant-entrepreneur à l’école des Gobelins Annecy après avoir obtenu mon DUT Informatique à l’Université Savoie Mont-Blanc.</p>
                            <p>Je suis créatif, curieux et j’aime le travail bien fait.</p>
                        </div>
                        <div className='social-medias'>
                            <a href="https://github.com/Ptitjbus" target="_blank" rel="noopener noreferrer">
                                <button>
                                    <i className="bi bi-github"></i>
                                    GitHub
                                </button>
                            </a>
                            <a href="https://www.linkedin.com/in/mathis-viollet/" target="_blank" rel="noopener noreferrer">
                                <button>
                                    <i className="bi bi-linkedin"></i>
                                    LinkedIn
                                </button>
                            </a>
                        </div>
                    </div>

                </div>
            </div >
        </>
    )
}