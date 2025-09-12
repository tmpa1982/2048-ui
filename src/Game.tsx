import Cell from './Cell'
import type { Board } from './types'

type GameProps = {
  game: string
  board: Board
}

export default function Game({ game, board }: GameProps) {
  return (
    <div className="flex flex-col items-center justify-center">
      <p className="text-amber-300 p-8">Game ID: {game}</p>
      {board.cells.map((row, rowIndex) => (
        <div key={rowIndex} className="flex justify-center items-center">
          {row.map((cell, cellIndex) => (
            <Cell value={cell} key={cellIndex} />
          ))}
        </div>
      ))}
    </div>
  )
}
