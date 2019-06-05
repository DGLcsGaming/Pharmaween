import React, { useState } from "react";

export const GlobalStateContext = React.createContext();

export const GlobalStateProvider = props => {
  const [searchBarState, setSearchBarState] = useState({
    isLoading: false,
    options: [],
    selectedCityId: -1,
    selectedCityName: null
  });

  const [mapState, setMapState] = useState({
    isLoading: false,
    showLocationPrompt: false,
    showLocationControl: false,
    hasUserLocation: false,
    userLocation: {
      lat: 0,
      lon: 0
    },
    shifts: []
  });

  return (
    <GlobalStateContext.Provider
      value={{ searchBarState, setSearchBarState, mapState, setMapState }}>
      {props.children}
    </GlobalStateContext.Provider>
  );
};
