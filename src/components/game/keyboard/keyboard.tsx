import './keyboard.less'
import { JSX } from "react";
import Key from "./key";

const Keyboard = (): JSX.Element => {
    const keyRow1: { keyType: 'letter' | 'action', text: string }[] = [
        { keyType: 'letter', text: "Q" },
        { keyType: 'letter', text: "W" },
        { keyType: 'letter', text: "E" },
        { keyType: 'letter', text: "R" },
        { keyType: 'letter', text: "T" },
        { keyType: 'letter', text: "Y" },
        { keyType: 'letter', text: "U" },
        { keyType: 'letter', text: "I" },
        { keyType: 'letter', text: "O" },
        { keyType: 'letter', text: "P" }
    ]
    const keyRow2: { keyType: 'letter' | 'action', text: string }[] = [
        { keyType: 'letter', text: "A" },
        { keyType: 'letter', text: "S" },
        { keyType: 'letter', text: "D" },
        { keyType: 'letter', text: "F" },
        { keyType: 'letter', text: "G" },
        { keyType: 'letter', text: "H" },
        { keyType: 'letter', text: "J" },
        { keyType: 'letter', text: "K" },
        { keyType: 'letter', text: "L" }
    ]
    const keyRow3: { keyType: 'letter' | 'action', text: string }[] = [
        { keyType: 'action', text: "Enter" },
        { keyType: 'letter', text: "Z" },
        { keyType: 'letter', text: "X" },
        { keyType: 'letter', text: "C" },
        { keyType: 'letter', text: "V" },
        { keyType: 'letter', text: "B" },
        { keyType: 'letter', text: "N" },
        { keyType: 'letter', text: "M" },
        { keyType: 'action', text: "Delete" }
    ]

    return (
        <div className='keyboard'>
            <div className='key-row'>
                {keyRow1.map((key) => <Key {...key} />)}
            </div>
            <div className='key-row indent'>
                {keyRow2.map((key) => <Key {...key} />)}
            </div>
            <div className='key-row'>
                {keyRow3.map((key) => <Key {...key} />)}
            </div>
        </div>
    )
}

export default Keyboard;