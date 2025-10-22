import type { JSX } from 'react';
import Board from './components/game/board/board';
import './index.less';
import { fetchWord } from './store/gameSlice';
import { useAppDispatch } from './store/hooks';
import Keyboard from './components/game/keyboard/keyboard';

const App = (): JSX.Element => {
  const dispatch = useAppDispatch();
  dispatch(fetchWord());

  return (
    <div className="layout">
      <Board />
      <Keyboard />
    </div>
  );
};

export default App;
