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

  async function ask() {
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
  }

  function accept() {
    setBoard(suggestedBoard!)
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
        <button className="button" onClick={ask}>Ask AI</button>
      )}
    </div>
  );
}
