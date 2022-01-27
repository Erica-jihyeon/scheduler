import { useState } from 'react';

export function useVisualMode(initialMode) {
  const [mode, setMode] = useState(initialMode);
  const [history, setHistory] = useState([initialMode]);


  /**
   * if replace is true
   * remove the last mode and replace it with the newMode
   */
  const transition = (newMode, replace = false) => {
    setMode(newMode);
    const newHistory = [...history];
    replace ? newHistory.splice(-1, 1, newMode) : newHistory.push(newMode);
    setHistory(newHistory);
  }

  /**
   * return to the last mode
   */
  const back = () => {
    let newHistory = [];

    if (history.length >= 1) {
      newHistory = [...history]
      newHistory.pop();
      setHistory(newHistory);
      setMode(newHistory.slice(-1)[0])
    }
  }

  return { mode, transition, back };
}