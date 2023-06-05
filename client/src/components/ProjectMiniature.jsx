export default function ProjecMiniature(props) {

    return (
        <>
            <div className="project">
                <div className="cube">
                    <img src={`${window.baseUrl}${props.info.attributes.cover.data.attributes.url}`} alt={props.info.attributes.name} />
                </div>
            </div>
        </>
    )
}