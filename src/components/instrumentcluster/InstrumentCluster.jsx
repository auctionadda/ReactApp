import React from 'react'
import Off from './Off'
import { GlobalStateContext } from '../../context/context'
import Speedomter from './Speedomter'
import { useContext } from 'react'

const InstrumentCluster = () => {
  const {state} = useContext(GlobalStateContext)
  return (
    <>
    {state.engine === 'off' ? <Off/>: <Speedomter/>}
    </>
  )
}

export default InstrumentCluster