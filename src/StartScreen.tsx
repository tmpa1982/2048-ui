import { Play } from 'lucide-react'
import type { Board } from "./types"
import url from './apiUrl'

interface StartScreenProps {
  onStart: (gameId: string) => void
  setBoard: (board: Board) => void
}

export default function StartScreen({ onStart, setBoard }: StartScreenProps) {
  const createGame = async () => {
    console.log(url)
    const response = await fetch(`${url}/api/game`, { method: 'POST' })
    const data = await response.json()
    onStart(data.id)
    setBoard(data.board)
  }

  return (
    <div className="flex flex-col items-center justify-center h-full space-y-4">
      <button className="button flex items-center gap-2"
      onClick={createGame}><Play />New Game</button>
    </div>
  )
}
