import type { JSX } from 'react';
import Board from './components/game/board';
import './index.less';
import { fetchWord } from './store/gameSlice';
import { useAppDispatch } from './store/hooks';

const App = (): JSX.Element => {
  const dispatch = useAppDispatch();
  dispatch(fetchWord());

  return (
    <div className="layout">
      <Board />
    </div>
  );
};

export default App;
