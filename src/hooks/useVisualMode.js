import React, { useState } from "react";

export default function useVisualMode(initial) {

  const [modes, setModes] = useState([initial]);
  
  
  const transition = function (mode, replace) {
    
    const newModes = [...modes];

    if (replace){
      newModes.pop();
    }

    newModes.push(mode);
    setModes(newModes);
  };

  const back = function () {
    if (modes.length < 2) {
      return;
    }

    const newModes = [...modes];
    newModes.pop();
    setModes(newModes);

  };

  const mode = modes[modes.length - 1];

  
  return { mode, transition, back };
};

