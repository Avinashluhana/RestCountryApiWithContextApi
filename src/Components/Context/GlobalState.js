import React, { createContext, useReducer, useEffect } from "react";
import AppReducer from "./AppReducer";

export const GlobalContext = createContext();

export const GlobalProvider = (props) => {
  const initialState = {
    countryData: [],
    loading: false,
    error: "",
    country: [],
    searchCountry: [],
  };

  const [state, dispatch] = useReducer(AppReducer, initialState);

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {props.children}
    </GlobalContext.Provider>
  );
};
