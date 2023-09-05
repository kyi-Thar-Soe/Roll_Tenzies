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
    setRandomNumbers(newArray)
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
        setTenzies(true)
    }else{
      setTenzies(false)
    }
}, [randomNumbers]);

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
      {tenzies? <button className="btn new--die" onClick={generateRandomNumbers}>New Game</button> : 
      <button className="btn roll--die" onClick={rollDie}>Roll</button>}
    </div>
    </div>
  )
}


export default App
