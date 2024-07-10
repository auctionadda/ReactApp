import { useEffect } from "react";
import { GlobalStateContext } from "../../context/context";
import { channel, subscribeToEvents } from "../../Utility";
import { useContext } from "react";

export const useEventManager = () => {
  const { state, dispatch } = useContext(GlobalStateContext);

  const updateSpeed = (value) => {
    dispatch({ type: "UPDATE_SPEED", payload: value });
  };
  const updateEngine = (value) => {
    dispatch({ type: "UPDATE_ENGINE", payload: value });
  };
  const updateFuelLevel = (value) => {
    dispatch({ type: "UPDATE_FUEL_LEVEL", payload: value });
  };

  const updateTemperature = (value) => {
    dispatch({ type: "UPDATE_TEMPREATURE", payload: value });
  };
  const updateMode = (value) => {
    dispatch({ type: "UPDATE_MODE", payload: value });
  };
  const updateKiloMeterDone = (value) => {
    dispatch({ type: "UPDATE_KILOMETER_DONE", payload: value });
  };

  const handleMessage = (incomingMessage) => {
    const parsedMessage = JSON.parse(incomingMessage);
    switch (parsedMessage.function) {
      case "start":
        updateEngine(parsedMessage.value);
        break;
      case "speed":
        // console.log(parsedMessage)
        updateSpeed(parsedMessage.value);
        break;
      case "fuelLevel":
        updateFuelLevel(parsedMessage.value);
        break;
      case "temperature":
        updateTemperature(parsedMessage.value);
        break;
      case "mode":
        updateMode(parsedMessage.value);
        break;
      case "kiloMeterDone":
        updateKiloMeterDone(parsedMessage.value);
        break;
      default:
        console.log("Unknown message type:", parsedMessage.value);
    }
  };

  useEffect(() => {
    subscribeToEvents(handleMessage);
  }, []);

  useEffect(() => {
    const channelListener = ({ data }) => handleMessage(data);
    channel.addEventListener("message", channelListener);
    return () => {
      channel.removeEventListener("message", channelListener);
    };
  }, []);

  return {
    instrumentState: state,
    handleMessage,
  };
};
