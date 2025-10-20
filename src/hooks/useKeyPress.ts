import { useEffect, useState } from 'react';
import { useAppDispatch } from '../store/hooks';
import { deleteLetter, setNextLetter, submitRow } from '../store/gameSlice';

const useKeyPress = () => {
  const [key, setKey] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (/^[a-zA-Z]$/.test(event.key)) {
        const letter = event.key.toUpperCase();
        setKey(letter);
        dispatch(setNextLetter(letter));
      } else if (event.key == 'Backspace') {
        dispatch(deleteLetter());
      } else if (event.key === 'Enter') {
        dispatch(submitRow());
      }
    };

    globalThis.addEventListener('keydown', handleKeyDown);

    return () => {
      globalThis.removeEventListener('keydown', handleKeyDown);
    };
  }, [dispatch]);

  return { key };
};

export default useKeyPress;
