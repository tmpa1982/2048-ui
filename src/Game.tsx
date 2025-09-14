import { useCallback, useEffect, useState } from 'react'
import { Award, Skull, Loader } from 'lucide-react'
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
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const move = useCallback(async (direction: string) => {
    if (isLosing) return
    if (isWinning) return
    if (isLoading) return

    setIsLoading(true)
    try {
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
    } catch (error) {
      console.error(`Error in making ${direction} move: ${error}`)
    } finally {
      setIsLoading(false)
    }
  }, [isLosing, isWinning, game, isLoading, setBoard])

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
  }, [move])

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
      ) : isLoading ? (
        <div className="text flex items-center justify-center p-2 gap-2"><Loader  className="animate-spin" />Loading</div>
      ) : (
        <Assistant board={board} move={move} />
      )}
    </div>
  )
}
