import { GlobalStateProvider } from "./context/context";
import Root from "./Root";

function App() {
  return (
    <GlobalStateProvider>
      <Root />
    </GlobalStateProvider>
  );
}

export default App;
