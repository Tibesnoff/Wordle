import { CellState } from '../../store/gameSlice';
import { useAppSelector } from '../../store/hooks';
import './cell.less'
import { useCallback, type JSX } from "react"

interface CellProps {
    col: number;
    row: number;
}

const Cell = ({ col, row }: CellProps): JSX.Element => {
    const { rows, activeRow } = useAppSelector(state => state.game);

    const getCell = () => {
        return rows[row].cells[col];
    }

    const getStateClassname = useCallback(() => {
        const { state } = getCell();
        if (col == 0 && row == 0)
            console.log('Cell state:', state);

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
    }, [activeRow]);

    return (
        <div className={`cell ${getStateClassname()}`}>{getCell().letter}</div>
    )
}

export default Cell