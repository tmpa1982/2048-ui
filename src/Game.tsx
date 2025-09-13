import { useEffect } from 'react'
import GameBoard from './GameBoard'
import type { Board } from './types'
import Assistant from './Assistant'
import url from './apiUrl'

type GameProps = {
  game: string
  board: Board
  setBoard: (board: Board) => void
}

export default function Game({ game, board, setBoard }: GameProps) {
  useEffect(() => {
    const keyPressed = async (e: KeyboardEvent) => {
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

    document.addEventListener('keyup', keyPressed)
    return () => {
      document.removeEventListener('keyup', keyPressed)
    }
  }, [])

  async function move(direction: string) {
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
    <div className="p-4 flex flex-col items-center justify-center max-h-full overflow-y-auto">
      <GameBoard board={board} />
      <Assistant board={board} move={move} />
    </div>
  )
}
