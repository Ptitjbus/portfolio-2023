export default function ProjecMiniature(props) {

    return (
        <>
            <div className="project">
                <div className="cube">
                    <img src={`/public/images/covers/${props.info.imageFolderName}.png`} alt={props.info.title} />
                </div>
            </div>
        </>
    )
}