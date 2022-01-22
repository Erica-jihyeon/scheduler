import { useState } from 'react';

export function useVisualMode(initialMode) {
  const [mode, setMode] = useState(initialMode);
  const [history, setHistory] = useState([initialMode]);

  const transition = (newMode, replace = false) => {
    setMode(newMode);
    if (replace) {
      const newArr = [...history]
      newArr.splice(-1, 1, "THIRD") 
      setHistory(newArr);
    } else {
      const newArr = [...history]
      newArr.push(newMode)
      setHistory(newArr);
    }
  }

  const back = () => {
    let newArr = [];

    if (history.length >= 1) {
      newArr = [...history]
      newArr.pop();
      setHistory(newArr);
      setMode(newArr.slice(-1)[0])
    }
  }

  return { mode, transition, back };
}