import { CellState } from '../../../store/gameSlice';
import { useAppSelector } from '../../../store/hooks';
import './cell.less';
import { type JSX } from 'react';

interface CellProps {
  rowIndex: number;
  colIndex: number;
}

const Cell = ({ rowIndex, colIndex }: CellProps): JSX.Element => {
  const cell = useAppSelector(state => state.game.rows[rowIndex].cells[colIndex]);

  const getStateClassname = () => {
    switch (cell.state) {
      case CellState.UNUSED:
        return 'unused';
      case CellState.INCORRECT:
        return 'incorrect';
      case CellState.CLOSE:
        return 'close';
      case CellState.CORRECT:
        return 'correct';
    }
  };

  return <div className={`cell ${getStateClassname()}`}>{cell.letter}</div>;
};

export default Cell;
