import type { Board } from "./types"
import Cell from "./Cell"

interface GameBoardProps {
  board: Board
}

export default function GameBoard({ board }: GameBoardProps) {
  return (
    <>
      {board.cells.map((row, rowIndex) => (
        <div key={rowIndex} className="flex justify-center items-center">
          {row.map((cell, cellIndex) => (
            <Cell value={cell} key={cellIndex} />
          ))}
        </div>
      ))}
    </>
  )
}
