import { useState } from "react"
import type { Board } from "./types";

interface AssistantProps {
  board: Board
  setBoard: (board: Board) => void
}

export default function Assistant({ board, setBoard }: AssistantProps) {
  const [direction, setDirection] = useState<string | null>(null);
  const [reasoning, setReasoning] = useState<string | null>(null);
  const [suggestedBoard, setSuggestedBoard] = useState<Board | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function ask() {
    if (isLoading) return
    setIsLoading(true)
    try {
      const url: string = import.meta.env.VITE_API_URL
      const response = await fetch(`${url}/api/evaluate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ board: board.cells })
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
    setBoard(suggestedBoard!)
    setDirection(null)
    setReasoning(null)
    setSuggestedBoard(null)
  }

  return (
    <div className="p-4">
      {direction ? (
        <div className="flex flex-col items-center">
          <p className="text">Direction: {direction}</p>
          {reasoning && <p className="text">Reasoning: {reasoning}</p>}
          <button className="button" onClick={accept}>Accept</button>
        </div>
      ) : (
        <button className="button" onClick={ask} disabled={isLoading}>
          {isLoading ? "AI is thinking" : "Ask AI"}
        </button>
      )}
    </div>
  );
}
