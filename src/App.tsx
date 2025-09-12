import { useState } from 'react'
import './App.css'
import Game from './Game';
import StartScreen from './StartScreen';

function App() {
  const [game, setGame] = useState<string | null>(null);
  const [board, setBoard] = useState<Board | null>(null);

  return (
    <div className="bg-blue-950 h-screen">
      {game && <Game game={game} board={board} setBoard={setBoard} /> || <StartScreen onStart={setGame} setBoard={setBoard} />}
    </div>
  )
}

export default App
