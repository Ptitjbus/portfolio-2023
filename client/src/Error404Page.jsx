import { Link } from "react-router-dom";

export default function Error404Page() {

    return (
        <>
            <h2>Erreur 404 : Cette page n'existe pas</h2>
            <Link to="/" aria-label='back to home   '>Revenir à l'accueil</Link>
        </>
    )
}