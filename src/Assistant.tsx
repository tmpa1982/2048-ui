import { useEffect, useState } from "react"
import { Bot, Loader, CircleArrowLeft, CircleArrowRight, CircleArrowUp, CircleArrowDown, CircleX } from "lucide-react"
import type { Board } from "./types";
import url from './apiUrl'
import GameBoard from "./GameBoard";

interface AssistantProps {
  board: Board
  move: (direction: string) => void
}

export default function Assistant({ board, move }: AssistantProps) {
  const [direction, setDirection] = useState<string | null>(null);
  const [reasoning, setReasoning] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [suggestedBoard, setSuggestedBoard] = useState<Board | null>(null)
  const [model, setModel] = useState("gpt-5-chat")

  useEffect(() => {
    reset()
  }, [board]);

  async function ask() {
    if (isLoading) return
    setIsLoading(true)
    console.log(model)
    try {
      const response = await fetch(`${url}/api/evaluate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ board: board.cells, model })
      })
      const data = await response.json()
      setDirection(data.evaluation?.bestMove)
      setReasoning(data.evaluation?.reasoning)
      setSuggestedBoard(data.board)
    } catch (error) {
      console.error("Error fetching AI suggestion:", error)
    } finally {
      setIsLoading(false)
    }
  }

  function accept() {
    if (isLoading) return
    if (!direction) return
    move(direction)
    reset()
  }

  function selectDirection(direction: string) {
    switch (direction) {
      case 'LEFT': return <CircleArrowLeft />
      case 'RIGHT': return <CircleArrowRight />
      case 'UP': return <CircleArrowUp />
      case 'DOWN': return <CircleArrowDown />
    }
  }

  function reset() {
    setDirection(null)
    setReasoning(null)
    setSuggestedBoard(null)
  }

  return (
    <div className="p-4">
      {direction ? (
        <div className="flex flex-col items-center">
          <div className="flex gap-2">
            <button className="button" onClick={accept}>{selectDirection(direction)}Accept</button>
            <button className="button" onClick={reset}>< CircleX />Cancel</button>
          </div>
          {reasoning && <p className="text-xs text-gray-400 p-2">{reasoning}</p>}
          {suggestedBoard && <GameBoard board={suggestedBoard} />}
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <button className="button" onClick={ask} disabled={isLoading}>
            {isLoading ? <><Loader className="animate-spin" />Thinking</> : <><Bot />Ask AI</>}
          </button>
          <select className="text bg-blue-950 m-2 border-3 border-gray-600 rounded-md p-1" value={model} onChange={(e) => setModel(e.target.value)}>
            <option>gpt-4o-mini</option>
            <option>gpt-4o</option>
            <option>gpt-4.1</option>
            <option>gpt-5-chat</option>
          </select>
        </div>
      )}
    </div>
  );
}
