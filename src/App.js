import React, { useState, useEffect } from 'react';
import './App.css';
import ShowSpeed from './components/showSpeed/showSpeed';
import TextArea from './components/textArea/textArea';
import Timer from './components/timer/timer';
import TypeArea from './components/typeArea/typeArea';
import data from './data/data';

function random(arr = []) {
  for (arr.length; arr.length < 3;) {
    const num = Math.floor(Math.random() * 35);
    arr.unshift(data[num]);
  }
  return arr;
}

let timer = false;

function App() {
  const [chars, setChars] = useState(0);
  const [randomData, setRandomData] = useState(random());
  const [startTime, setStartTime] = useState(null);
  const [lettersPerMinute, setLettersPerMinute] = useState(0);

  useEffect(() => {
    if (startTime !== null) {
      const currentTime = Date.now();
      const elapsedTime = (currentTime - startTime) / 1000; // convert to seconds
      const lettersPerMinute = (chars / elapsedTime) * 60;
      setLettersPerMinute(lettersPerMinute);
    }
  }, [chars, startTime]);

  const countChar = () => {
    if (startTime === null) {
      setStartTime(Date.now());
    }
    setChars(prevState => prevState + 1);
  };

  const update = () => {
    setRandomData(prevState => {
      let arrCopy = prevState;
      arrCopy.pop();
      const newArr = random(arrCopy);
      return [...newArr];
    });
    countChar();
  };

  function onTime() {
    timer = true;
    const currentTime = Date.now();
    const elapsedTime = (currentTime - startTime) / 1000; // convert to seconds
    const lettersPerMinute = (chars / elapsedTime) * 60;
    setLettersPerMinute(lettersPerMinute);
  }

  if (timer) {
    timer = false;
    return <ShowSpeed onReset={() => setChars(0)} speed={lettersPerMinute.toFixed(1)} />;
  }

  return (
    <div className="app">
      {chars > 0 ? (
        <Timer time={300} onStart={() => setStartTime(null)} onTime={() => onTime()} />
      ) : null}
      <TextArea words={randomData} />
      <TypeArea words={randomData} onType={update} onChar={countChar} />
    </div>
  );
}

export default App;
