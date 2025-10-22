import { useCallback, useEffect } from 'react';
import { useAppDispatch } from '../store/hooks';
import { deleteLetter, setNextLetter, submitRow } from '../store/gameSlice';

const useGame = () => {
    const dispatch = useAppDispatch();

    const onKeyPress = useCallback(
        (key: string) => {
            if (/^[a-zA-Z]$/.test(key)) {
                const letter = key.toUpperCase();
                dispatch(setNextLetter(letter));
            } else if (key == 'Backspace') {
                dispatch(deleteLetter());
            } else if (key === 'Enter') {
                dispatch(submitRow());
            }
        },
        [setNextLetter, deleteLetter, submitRow, dispatch],
    );

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            onKeyPress(event.key);
        };

        globalThis.addEventListener('keydown', handleKeyDown);

        return () => {
            globalThis.removeEventListener('keydown', handleKeyDown);
        };
    }, [onKeyPress]);
};

export default useGame;
