import { useEffect, useState } from 'react'
import { Award, Skull } from 'lucide-react'
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
  const [isLosing, setIsLosing] = useState<boolean>(false)
  const [isWinning, setIsWinning] = useState<boolean>(false)

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
    if (isLosing) return
    if (isWinning) return
    const response = await fetch(`${url}/api/game/${game}/move`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ direction })
    })
    const data = await response.json()
    setBoard(data.board)
    setIsLosing(data.isLosing)
    setIsWinning(data.isWinning)
  }

  return (
    <div className="p-4 flex flex-col items-center justify-center max-h-full overflow-y-auto">
      <GameBoard board={board} />
      {isLosing ? (
      <div className="flex items-center justify-center h-full space-y-4 gap-2 text-gray-300 p-2">
        <Skull />You lost!
      </div>
      ) : isWinning ? (
      <div className="flex items-center justify-center h-full space-y-4 gap-2 text p-2">
        <Award />You won!
      </div>
      ) : (
        <Assistant board={board} move={move} />
      )}
    </div>
  )
}
