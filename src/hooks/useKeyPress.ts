import { useEffect } from 'react';
import { useAppDispatch } from '../store/hooks';

const useKeyPress = (onKeyPress: (key: string) => void) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      onKeyPress(event.key);
    };

    globalThis.addEventListener('keydown', handleKeyDown);

    return () => {
      globalThis.removeEventListener('keydown', handleKeyDown);
    };
  }, [dispatch]);

  return {};
};

export default useKeyPress;
