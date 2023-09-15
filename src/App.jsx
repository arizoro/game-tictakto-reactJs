import { useState } from 'react'
import './App.css'

function Square({value,onSquareleClick}){

  return <button className='square' onClick={onSquareleClick} > {value} </button>
}




function Board({xIsNext, squares, onPlay}) {
  

  function handleClick (i) {
    if(squares[i] || callculateWinner(squares) ) return 

    const nextSquare = squares.slice()
    nextSquare[i] = xIsNext ? 'X' : 'O'

    onPlay(nextSquare)
  }

  const winners = callculateWinner(squares) 
  let status = ''
  if(winners) {
    status = 'Winner : ' + winners
  }else{
    status = 'Next Player : ' + (xIsNext ? 'X' : 'O')
  }

  return (
    <>
    <div className='status'>{status}</div>
    <div className='board'>
      <Square value={squares[0]} onSquareleClick={() => handleClick(0)} />
      <Square value={squares[1]} onSquareleClick={() => handleClick(1)}/>
      <Square value={squares[2]} onSquareleClick={() => handleClick(2)}/>
      <Square value={squares[3]} onSquareleClick={() => handleClick(3)}/>
      <Square value={squares[4]} onSquareleClick={() => handleClick(4)}/>
      <Square value={squares[5]} onSquareleClick={() => handleClick(5)}/>
      <Square value={squares[6]} onSquareleClick={() => handleClick(6)}/>
      <Square value={squares[7]} onSquareleClick={() => handleClick(7)}/>
      <Square value={squares[8]} onSquareleClick={() => handleClick(8)}/>
    </div>
    </>
  )
}

export default function Game(){
  const [currentMove, setCurrentMove] = useState(0)
  const [history, setHistory] = useState([Array(9).fill(null)])

  const xIsNext = currentMove % 2 === 0
  const currentSquare = history[ currentMove ]

  function jumpTo(nextMove){
    setCurrentMove(nextMove)
  }

  function handlePlay(nextSquare) {
    const nexHistory = [...history.slice(0, currentMove + 1) , nextSquare]
    setHistory(nexHistory)
    setCurrentMove(nexHistory.length - 1)
  }

  const moves = history.map((squares , move) => {
    let description = '';
    if(move > 0){
      description = 'Go to move # ' + move
    }else{
      description = 'Start game'
    }

    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    )
  })

  return (
    <div className='game'>

      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquare} onPlay={handlePlay} />
      </div>

      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  )
}



function callculateWinner (squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i] 
    
    if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
      return squares[a]
    }
  }

  return false
}
