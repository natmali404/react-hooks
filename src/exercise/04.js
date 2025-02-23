// useState: tic tac toe
// http://localhost:3000/isolated/exercise/04.js

import * as React from 'react'
//EXTRA CREDIT 2
//import { useLocalStorageState } from '../utils'



function useLocalStorageState(key, defaultValue = '') { 
  const [state, setState] = React.useState(() => {
    try {
      const localValue = window.localStorage.getItem(key)
      return localValue == null ? defaultValue : JSON.parse(localValue)
    } catch(error) {
      console.error("Oops! Error with parsing local value to JSON: ", error)
      return defaultValue
    }
  })

  React.useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(state))
    } catch(error) {
      console.error("Oops! Error with parsing JSON to local value: ", error)
    }
  }, [key, state])

  return [state, setState]
}



function Board({squares, onClick}) { //TO LEARN jeszcze raz czemu przekazujemy to jako obiekt (bo to komponent?)

  function renderSquare(i) {
    return (
      <button className="square" onClick={() => onClick(i)}> {/* {() => selectSquare(i)} */}
        {squares[i]}
      </button>
    )
  }

  return (
    <div>
      {/* 🐨 put the status in the div below */}
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      {/* <button className="restart" onClick={restart}>
        restart
      </button> */}
    </div>
  )
}



function Game() {
  //BASIC
  // const [squares, setSquares] = React.useState(Array(9).fill(null))
  //EXTRA CREDIT 1
  // const [squares, setSquares] = useLocalStorageState('squares1', Array(9).fill(null))
  //EXTRA CREDIT 3
  const [history, setHistory] = useLocalStorageState('history', [Array(9).fill(null)])
  const [step, setStep] = useLocalStorageState('step', 0)

  const currentSquares = history[step]

  console.log('History:', history)
  console.log('Step:', step)
  console.log('currentSquares: ', history[step])

  const nextValue = calculateNextValue(currentSquares) // 👽 TO LEARN: dlaczego w tych trzech zmiennych używamy normalnych zmiennych a nie useState (bardzo glupie pytanie pewnie)
  const winner = calculateWinner(currentSquares)
  const status = calculateStatus(winner, currentSquares, nextValue)

  function selectSquare(square) {
    console.log("Clicked square", square)
    if (winner || currentSquares[square]) {
      return
    }
    
    const updatedHistory = history.slice(0, step + 1)
    const squaresCopy = [...currentSquares] // 👽 to samo co nizej

    squaresCopy[square] = nextValue

    // 🐨 set the squares to your copy
    // setSquares(squaresCopy)
    // setHistory(moves.slice(0, step + 1).concat([squaresCopy]))
    setHistory([...updatedHistory, squaresCopy]) //A NIE [updatedHistory, squaresCopy] O MATKO bo to rozpakowuje tablice (spread syntax)
    setStep(step + 1)
    console.log('Move saved:', squaresCopy, " Step:", step)
  }

  function restart() {
    // 🐨 reset the squares
    // setSquares(Array(9).fill(null))
    setHistory([Array(9).fill(null)])
    setStep(0)
    console.log('Game restarted')
  }

  const moves = history.map((historyElement, stepIdx) => { //array.map((value, index, array) => { ... })
    const content = stepIdx ? `Go to move ${stepIdx}` : "Go to start"
    const isCurrentStep = stepIdx === step
    return (
      <li key={stepIdx}>
        <button disabled={isCurrentStep} onClick={() => setStep(stepIdx)}>
          {content} {isCurrentStep ? '(current)' : null}
        </button>
      </li>
    )
  }
  )

  return (
    <div className="game">
      <div className="game-board">
        <Board onClick={selectSquare} squares={currentSquares} />
        <button className="restart" onClick={restart}>
          restart
        </button>
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  )
  
}

// eslint-disable-next-line no-unused-vars
function calculateStatus(winner, squares, nextValue) {
  return winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
    ? `Scratch: Cat's game`
    : `Next player: ${nextValue}`
}

// eslint-disable-next-line no-unused-vars
function calculateNextValue(squares) {
  return squares.filter(Boolean).length % 2 === 0 ? 'X' : 'O'
}

// eslint-disable-next-line no-unused-vars
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

function App() {
  return <Game />
}

export default App
