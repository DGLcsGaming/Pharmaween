import React from "react";
import MainMap from "./components/MainMap";
import { GlobalStateProvider } from "./GlobalState";

const App = props => {
  return (
    <GlobalStateProvider>
      <MainMap />
    </GlobalStateProvider>
  );
};

export default App;
