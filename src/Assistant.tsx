import { useEffect, useState } from "react"
import { Bot, Loader } from "lucide-react"
import type { Board } from "./types";
import url from './apiUrl'

interface AssistantProps {
  board: Board
  move: (direction: string) => void
}

export default function Assistant({ board, move }: AssistantProps) {
  const [direction, setDirection] = useState<string | null>(null);
  const [reasoning, setReasoning] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setDirection(null)
    setReasoning(null)
  }, [board]);

  async function ask() {
    if (isLoading) return
    setIsLoading(true)
    try {
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
    setDirection(null)
    setReasoning(null)
  }

  return (
    <div className="p-4">
      {direction ? (
        <div className="flex flex-col items-center">
          <p className="text">Direction: {direction}</p>
          {reasoning && <p className="text-xs text-gray-400 p-2">{reasoning}</p>}
          <button className="button" onClick={accept}>Accept</button>
        </div>
      ) : (
        <button className="button flex items-center justify-center gap-2 w-48" onClick={ask} disabled={isLoading}>
          {isLoading ? <><Loader />Thinking</> : <><Bot />Ask AI</>}
        </button>
      )}
    </div>
  );
}
