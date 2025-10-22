import './board.less';
import { type JSX } from 'react';
import Cell from './cell';
import useGame from '../../hooks/useGame';

const Board = (): JSX.Element => {
  useGame();

  return (
    <div className="board">
      {[0, 1, 2, 3, 4, 5].map(row => (
        <>
          {[0, 1, 2, 3, 4].map(col => (
            <Cell key={`cell-${row}-${col}`} colIndex={col} rowIndex={row} />
          ))}
        </>
      ))}
    </div>
  );
};

export default Board;
