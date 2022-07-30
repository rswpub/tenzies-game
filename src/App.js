import Dice from './Dice'

export default function App() {

  function fiveNewDice() {
    let numsArray = [];
    for (let i = 0; i < 5; i++) {
      numsArray.push(Math.floor(Math.random() * 6) + 1)
    }
    return numsArray
  }

  return (
    <main className="app-container">
      <div className="dice-row top">
        {fiveNewDice().map(dieNum => { return (<Dice value={dieNum} />) })}
      </div>
      <div className="dice-row bottom">
        {fiveNewDice().map(dieNum => { return (<Dice value={dieNum} />) })}
      </div>
    </main>
  );
}