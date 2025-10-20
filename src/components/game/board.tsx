import './board.less'
import { type JSX } from "react"
import Cell from "./cell"
import useKeyPress from '../../hooks/useKeyPress'

const Board = (): JSX.Element => {
  useKeyPress();

  return (
    <div className="board">
      {
        [0, 1, 2, 3, 4, 5].map(row => (
          <>
            {[0, 1, 2, 3, 4].map(col => (
              <Cell key={`cell-${row}-${col}`} col={col} row={row} />
            ))}
          </>
        ))
      }
    </div>
  )
}

export default Board