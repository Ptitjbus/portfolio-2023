import '../css/TagComponent.css'

export default function TagComponent(props) {
    return (
        <>
            <span className='tag'>
                {props.name}
            </span>
        </>
    )
}