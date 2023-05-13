import React, { useReducer, useContext } from "react";
import reducer from "./Reducer";
import { DISPLAY_ALERT, CLEAR_ALERT } from "./Action";
export const initialState = {
  showAlert: false,
  alertText: "",
  alertType: "",
  user: null,
};
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT });
    clearAlert();
  };
  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 3000);
  };
  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
export const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider };