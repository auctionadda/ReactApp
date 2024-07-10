import React, { useState } from "react";
import { channel } from "../../Utility";

const ClusterControl = () => {
  const [speed, setSpeedInput] = useState(0); // Initialize as an empty string

  const handleStart = () => {
    channel.postMessage(
      JSON.stringify({
        function: "start",
        value: "On",
      })
    );
  };

  const handleOff = () => {
    channel.postMessage(
      JSON.stringify({
        function: "start",
        value: "off",
      })
    );
  };

  const handleSpeed = (e) => {
    const inputValue = e.target.value;
    console.log(inputValue)
    setSpeedInput(inputValue);
    channel.postMessage(
      JSON.stringify({
        function: "speed",
        value: inputValue,
      })
    );
  };

  return (
    <div>
      <button onClick={handleStart}>Start Engine</button>
      <button onClick={handleOff}>Off Engine</button>
      <input
        id="Speed"
        type="number"
        placeholder="Enter speed..."
        value={speed}
        onChange={handleSpeed}
      />
    </div>
  );
};

export default ClusterControl;
