import { CellState } from '../../store/gameSlice';
import { useAppSelector } from '../../store/hooks';
import './cell.less'
import type { JSX } from "react"

interface CellProps {
    col: number;
    row: number;
}

const Cell = ({ col, row }: CellProps): JSX.Element => {
    const { rows } = useAppSelector(state => state.game);

    const getCell = () => {
        return rows[row].cells[col];
    }

    const getStateClassname = () => {
        const { state } = getCell();

        switch (state) {
            case CellState.UNUSED:
                return 'unused'
            case CellState.INCORRECT:
                return 'incorrect'
            case CellState.CLOSE:
                return 'close'
            case CellState.CORRECT:
                return 'correct'
        }
    }

    return (
        <div className={`cell ${getStateClassname()}`}>{getCell().letter}</div>
    )
}

export default Cell