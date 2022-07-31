import React, { useState } from "react"
import Dice from './Dice'

export default function App() {
  const [topFiveDice, setTopFiveDice] = useState(fiveNewDice())
  const [bottomFiveDice, setBottomFiveDice] = useState(fiveNewDice())

  function fiveNewDice() {
    let numsArray = [];
    for (let i = 0; i < 5; i++) {
      numsArray.push({key: i, dieNum: Math.floor(Math.random() * 6) + 1})
    }
    return numsArray
  }

  function rollDice() {
    setTopFiveDice(fiveNewDice())
    setBottomFiveDice(fiveNewDice())
  }

  return (
    <main className="app-container">
      <div className="dice-row top">
        {topFiveDice.map(dieInfo => <Dice key={dieInfo.key} value={dieInfo.dieNum} /> )}
      </div>
      <div className="dice-row bottom">
        {bottomFiveDice.map(dieInfo => <Dice key={dieInfo.key} value={dieInfo.dieNum} /> )}
      </div>
      <button className="roll-button" onClick={rollDice}>Roll</button>
    </main>
  );
}