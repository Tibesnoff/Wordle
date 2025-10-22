import './key.less'
import { JSX } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { CellState, deleteLetter, setNextLetter, submitRow } from "../../../store/gameSlice";

interface KeyProps {
    keyType: 'letter' | 'action'
    text: string
}

const Key = ({ keyType, text }: KeyProps): JSX.Element => {
    const dispatch = useAppDispatch();

    const usedLetters = useAppSelector(state => state.game.usedLetters);

    const getClassname = () => {
        let baseClassname = keyType + " key";

        const letterValue = usedLetters[text] ?? 4;
        baseClassname += " ";

        switch (letterValue) {
            case CellState.INCORRECT:
                baseClassname += 'incorrect'
                break;
            case CellState.CLOSE:
                baseClassname += 'close'
                break;
            case CellState.CORRECT:
                baseClassname += 'correct'
                break;
            default:
                baseClassname += 'unused'
                break;
        }

        return baseClassname;
    }

    const onClick = () => {
        switch (text) {
            case "Enter":
                dispatch(submitRow());
                break;
            case "Delete":
                dispatch(deleteLetter());
                break;
            default:
                dispatch(setNextLetter(text.substring(0, 1)));
                break
        }
    }

    return <button className={getClassname()} onClick={onClick}>{
        // ngl this whole setup is bad with the svg inline but I am lazy and just copied the svg from wordle
        text == "Delete" ?
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                fill="currentColor"
            >
                <path d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H7.07L2.4 12l4.66-7H22v14zm-11.59-2L14 13.41 17.59 17 19 15.59 15.41 12 19 8.41 17.59 7 14 10.59 10.41 7 9 8.41 12.59 12 9 15.59z" />
            </svg>
            : text}
    </button>
}

export default Key;