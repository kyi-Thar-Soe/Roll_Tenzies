import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min"
import './App.css'
import Die from "./Components/Die"
import { useEffect, useState } from "react"
import {nanoid} from 'nanoid'
import Confetti from 'react-confetti'

function App() {
  const [randomNumbers,setRandomNumbers] = useState([]);
  const [tenzies,setTenzies] = useState(false);
  const [gameStartTime, setGameStartTime] = useState(null);
  const [gameDuration, setGameDuration] = useState(0);
  
  const generateNewDie = () => {
    return {
      value: Math.floor(Math.random() * 6 + 1), 
      isHeld: false,
      id: nanoid(),
    };
  };

  const generateRandomNumbers = () => {
    const newArray = [];
    for(let i=0; i<10; i++){
      newArray.push(generateNewDie());
    }
    setRandomNumbers(newArray);
    setGameStartTime(Date.now()); // Initialize game start time
    setGameDuration(0);
  };
   useEffect(() => {
    generateRandomNumbers();
  },[]);

  const rollDie = () => {
    const updatedRandomNumbers = randomNumbers.map((die) => {
      if(!die.isHeld){
        return generateNewDie()
      }
        return die
    });
    setRandomNumbers(updatedRandomNumbers);
  };

  const holdDie = (id) => {
   const holdNumbers = randomNumbers.map((randomNumber => {
    if(randomNumber.id === id) {
      return {...randomNumber, isHeld: !randomNumber.isHeld}
    }
    return randomNumber
   }));
   setRandomNumbers(holdNumbers);
  };

  //for new game
  useEffect(() => {
    const allHeld = randomNumbers.every(die => die.isHeld)
    const firstValue = randomNumbers.length>0 ? randomNumbers[0].value : 0;
    const allSameValue = randomNumbers.every(die => die.value === firstValue)
    if (allHeld && allSameValue) {
        setTenzies(true);
        const currentTime = Date.now();
        setGameDuration(Math.floor((currentTime - gameStartTime) / 1000));
    }else{
      setTenzies(false)
    }
  }, [randomNumbers,gameStartTime]);

return (
    <div className="parent--div col col-md-6">
      <div className="child--div col col-md-10">
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. 
            Click each die to freeze it at its current value between rolls.</p>
      <div className="die--container">
      
      {tenzies && <Confetti className="confetti"/>}
        {randomNumbers.map((num) => {
          return <Die value={num.value} 
                      key={num.id} 
                      isHeld={num.isHeld}
                      toggle={()=>holdDie(num.id)}/>
        })}
      </div>
      {tenzies? 
      <div className="win--condition">
        <button className="btn new--die" onClick={generateRandomNumbers}>New Game</button>
        <p className="time">Time to win: <span className="fw-bold">{gameDuration}</span> seconds</p>
      </div> : 
      <button className="btn roll--die" onClick={rollDie}>Roll</button>}
    </div>
    </div>
  )
}

export default App
