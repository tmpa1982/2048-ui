import { useState } from 'react'
import { Loader, Play } from 'lucide-react'
import type { Board } from "./types"
import url from './apiUrl'

interface StartScreenProps {
  onStart: (gameId: string) => void
  setBoard: (board: Board) => void
}

export default function StartScreen({ onStart, setBoard }: StartScreenProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [withObstacle, setWithObstacle] = useState(false)
  const createGame = async () => {
    console.log(url)
    setIsLoading(true)

    try {
      const response = await fetch(`${url}/api/game`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ withObstacle })
      })
      const data = await response.json()
      onStart(data.id)
      setBoard(data.board)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-full space-y-4">
      <div className="flex items-center justify-center">
        <input type="checkbox" id="obstacle" className="mr-2" checked={withObstacle} onChange={() => setWithObstacle(!withObstacle)} />
        <label htmlFor="obstacle" className="text text-lg">Start with obstacle</label>
      </div>
      <button className="button"
      onClick={createGame}>{isLoading ? <><Loader className="animate-spin" />Loading</> : <><Play />New Game</>}</button>
    </div>
  )
}
