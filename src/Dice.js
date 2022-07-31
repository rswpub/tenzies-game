export default function Dice(props) {
    return (
        <div className={`dice ${props.isHeld ? 'is-held' : '' }`} onClick={() => props.holdDice(props.id)}>
            {props.value}
        </div>
    )
}