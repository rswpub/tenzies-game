import React, { useEffect, useState } from "react"
// import Confetti from "react-confetti/dist/types/Confetti"
import Confetti from "react-confetti"
import Dice from './Dice'

export default function App() {
  const [topFiveDice, setTopFiveDice] = useState(fiveNewDice(0))
  const [bottomFiveDice, setBottomFiveDice] = useState(fiveNewDice(5))
  const [hasWon, setHasWon] = useState(false)
  const [numRolls, setNumRolls] = useState(1)
  const [bestScore, setBestScore] = useState()
  const [isNewBestScore, setIsNewBestScore] = useState(false)

  useEffect(() => {
    const heldNum = topFiveDice[0].value
    if (topFiveDice.every(dice => dice.isHeld && dice.value === heldNum) && bottomFiveDice.every(dice => dice.isHeld && dice.value === heldNum)) {
      setHasWon(true)
      if ((bestScore === undefined) || (numRolls < bestScore)) {
        setBestScore(numRolls)
        setIsNewBestScore(true)
      }
    } else {
      setHasWon(false)
    }
  }
    , [topFiveDice, bottomFiveDice]
  )

  function fiveNewDice(idStart) {
    let numsArray = [];
    for (let i = 0; i < 5; i++) {
      numsArray.push({key: i + idStart, dieNum: Math.floor(Math.random() * 6) + 1, isHeld: false})
    }
    return numsArray
  }

  function rollDice() {
    setNumRolls(prevNumRolls => prevNumRolls + 1)
    if (hasWon) {
      setTopFiveDice(fiveNewDice(0))
      setBottomFiveDice(fiveNewDice(5))
      setHasWon(false)
      setNumRolls(1)
      setIsNewBestScore(false)
    } else {
      setTopFiveDice(prevTopFiveDice => fiveNewDice(0).map(dice => prevTopFiveDice[dice.key].isHeld ? prevTopFiveDice[dice.key] : dice))
      setBottomFiveDice(prevBottomFiveDice => fiveNewDice(5).map(dice => prevBottomFiveDice[dice.key - 5].isHeld ? prevBottomFiveDice[dice.key - 5] : dice))
    }
  }

  function holdDice(diceId) {
    diceId < 5 ?
      setTopFiveDice(prevTopFiveDice => prevTopFiveDice.map(dice => dice.key === diceId ? {...dice, isHeld: !dice.isHeld} : dice))
    : setBottomFiveDice(prevBottomFiveDice => prevBottomFiveDice.map(dice => dice.key === diceId ? { ...dice, isHeld: !dice.isHeld } : dice))
  }

  return (
    <main className="app-container">
      {hasWon && <Confetti /> }
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="dice-row top">
        {topFiveDice.map(dieInfo => <Dice key={dieInfo.key} id={dieInfo.key} value={dieInfo.dieNum} isHeld={dieInfo.isHeld} holdDice={holdDice} /> )}
      </div>
      <div className="dice-row bottom">
        {bottomFiveDice.map(dieInfo => <Dice key={dieInfo.key} id={dieInfo.key} value={dieInfo.dieNum} isHeld={dieInfo.isHeld} holdDice={holdDice} /> )}
      </div>
      <button className="roll-button" onClick={rollDice}>{ hasWon ? "New Game" : "Roll"}</button>
      <p className="num-rolls">Number of rolls: { numRolls }</p>
      <p className={`best-score ${isNewBestScore ? 'new-best-score' : ''}`}>Best score: { bestScore }</p>
    </main>
  );
}