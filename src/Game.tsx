import { useEffect } from 'react'
import Cell from './Cell'
import type { Board } from './types'

type GameProps = {
  game: string
  board: Board
  setBoard: (board: Board) => void
}

export default function Game({ game, board, setBoard }: GameProps) {
  useEffect(() => {
    const keyUp = async (e: KeyboardEvent) => {
      console.log("Key pressed:", e.key)
      switch (e.key) {
        case 'ArrowLeft':
          move('LEFT')
          break
        case 'ArrowRight':
          move('RIGHT')
          break
        case 'ArrowDown':
          move('DOWN')
          break
        case 'ArrowUp':
          move('UP')
          break
      }
    }

    document.addEventListener('keyup', keyUp)
    return () => {
      document.removeEventListener('keyup', keyUp)
    }
  }, [])

  async function move(direction: string) {
    const url: string = import.meta.env.VITE_API_URL
    const response = await fetch(`${url}/api/game/${game}/move`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ direction })
    })
    const data = await response.json()
    setBoard(data.board)
  }

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
