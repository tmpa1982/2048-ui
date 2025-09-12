import type { Board } from "./types"

interface StartScreenProps {
  onStart: (gameId: string) => void
  setBoard: (board: Board) => void
}

export default function StartScreen({ onStart, setBoard }: StartScreenProps) {
  const createGame = async () => {
    const url: string = import.meta.env.VITE_API_URL
    console.log(url)
    const response = await fetch(`${url}/api/game`, { method: 'POST' })
    const data = await response.json()
    onStart(data.id)
    setBoard(data.board)
  }

  return (
    <div className="flex flex-col items-center justify-center h-full space-y-4">
      <button className="bg-amber-600 text-blue-200 text-xl px-6 py-3 rounded"
      onClick={createGame}>New Game</button>
    </div>
  )
}
