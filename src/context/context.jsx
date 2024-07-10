import  { createContext,  useReducer } from 'react';

export const GlobalStateContext = createContext();
const initialState = {
  engine: 'off',
  speed: 0,
  fuelLevel: 100,
  temperature: 20,
  mode: 'normal',
  kiloMeterDone:0,
};

function reducer(state, action) {
  switch (action.type) {
    case 'UPDATE_ENGINE':
      if (action.payload === 'off') {
        return initialState; // Reset state to initialState
      }else{
        return { ...state, engine: action.payload };
      }
    case 'UPDATE_SPEED':
      return { ...state, speed: action.payload };
    case 'UPDATE_FUEL_LEVEL':
      return { ...state, fuelLevel: action.payload };
    case 'UPDATE_TEMPERATURE':
      return { ...state, temperature: action.payload };
    case 'UPDATE_MODE':
      return { ...state, mode: action.payload };
    case 'UPDATE_KILOMETER_DONE':
      return { ...state, kiloMeterDone: action.payload };
    default:
      return state;
  }
}


export const GlobalStateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  
  return (
    <GlobalStateContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

    


