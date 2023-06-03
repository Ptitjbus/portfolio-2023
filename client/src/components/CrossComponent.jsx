import { Link } from 'react-router-dom'
import '../css/CrossComponent.css'

export default function CrossComponent() {
    return (
        <>
            <Link to="/" className='close' aria-label='fermer'></Link>
        </>
    )
}