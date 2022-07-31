import Dice from './Dice'

export default function App() {

  function fiveNewDice() {
    let numsArray = [];
    for (let i = 0; i < 5; i++) {
      numsArray.push({key: i, dieNum: Math.floor(Math.random() * 6) + 1})
    }
    return numsArray
  }

  return (
    <main className="app-container">
      <div className="dice-row top">
        {fiveNewDice().map(dieInfo => { return (<Dice key={dieInfo.key} value={dieInfo.dieNum} />) })}
      </div>
      <div className="dice-row bottom">
        {fiveNewDice().map(dieInfo => { return (<Dice key={dieInfo.key} value={dieInfo.dieNum} />) })}
      </div>
    </main>
  );
}