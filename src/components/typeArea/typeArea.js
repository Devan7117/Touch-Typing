import React, { useState } from 'react';
import './typeArea.css';

const TypeArea = (props) => {
  const [styles, setStyles] = useState('');
  const { words, onType, onChar } = props;

  function update(e) {
    const current = e.target.value;
    const word = words[words.length - 1].slice(0, e.target.value.length);
  
    if (e.target.value === words[words.length - 1]) {
      e.target.value = '';
      onChar();
      onType();
    } else if (current !== word) {
      setStyles('red');
    } else {
      setStyles('');
      onChar();
    }
  }
  

  return (
    <>
      <div className="typeArea">
        <input
          autoFocus
          className={`typeArea ${styles ? 'red' : ''}`}
          type="text"
          maxLength="5"
          onChange={update}
        />
      </div>
      <div className="label">
        <a href="https://github.com/Devan7117">
          Made by <span>Devan</span>
        </a>
      </div>
    </>
  );
};

export default TypeArea;
