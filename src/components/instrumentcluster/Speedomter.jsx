import React from 'react'
import { GlobalStateContext } from '../../context/context'
import { useContext } from 'react'
import './speedometer.css'
const Speedomter = () => {
    const {state} = useContext(GlobalStateContext)
    console.log(state.speed)
    const calculateRotation = () => {
        const maxSpeed = 110; // Assuming maximum speed
        const minAngle = -30; // Minimum angle for needle
        const maxAngle = 210; // Maximum angle for needle
        const angle = ((state.speed / maxSpeed) * (maxAngle - minAngle)) + minAngle;
        return `rotate(${angle}deg)`;
      };
  return (<>
  
    <div>{state.speed}</div>
    <div className="analog-speedometer">
      <h1>Speedometer</h1>
      <div className="speedometer-body">
        <div className="needle" style={{ transform: calculateRotation() }}></div>
        <div className="dial"></div>
      </div>
      <div className="speed-value">{state.speed} km/h</div>
    </div>
  </>

  )
}

export default Speedomter