import { JSX } from 'react'
import './message.less'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { clearMessage, resetGame } from '../../../store/gameSlice'

const Message = (): JSX.Element => {
    const message = useAppSelector(state => state.game.message)
    const dispatch = useAppDispatch();

    // If message is null then there is no message to show
    if (message == null) return <></>

    // If there is the you win message we want to show a reset button and make sure the message does not go away
    if (message.includes("won") || message.includes("lost")) return (
        <div className='message'>
            <span>{message}</span>
            <button onClick={() => {
                dispatch(clearMessage());
                dispatch(resetGame());
            }}>Play Again</button>
        </div>
    )

    // Make sure the message goes away
    setTimeout(() => dispatch(clearMessage()), 2000)

    // Default message
    return (
        <div className='message'>
            <span>{message}</span>
        </div>
    )
}

export default Message