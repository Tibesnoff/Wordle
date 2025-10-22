import type { JSX } from 'react';
import Board from './components/game/board/board';
import './index.less';
import { fetchWord } from './store/gameSlice';
import { useAppDispatch } from './store/hooks';
import Keyboard from './components/game/keyboard/keyboard';
import Message from './components/game/message/message';

const App = (): JSX.Element => {
  const dispatch = useAppDispatch();
  dispatch(fetchWord());

  return (
    <div className="layout">
      <Board />
      <Keyboard />
      <Message />
    </div>
  );
};

export default App;
