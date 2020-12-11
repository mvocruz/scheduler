import { useState } from "react";

export default function useVisualMode(initial) {

  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  
  
  function transition(newMode, replace = false) {
    if(replace) {
      history.pop();
      history.push(newMode);
      setMode(history[history.length-1]);
    } else {
      history.push(newMode);
      setMode(history[history.length-1]);
    }
  };
  
  function back() {
    if (history.length < 2) {
      return;
    } 
    history.pop();
    setMode(history[history.length - 1]); 
  }
  
  return { mode, transition, back };
};
