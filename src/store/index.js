import React, { createContext, useContext, useReducer } from "react";

const AppStateContext = createContext();
const AppActionsContext = createContext();
const AppDispatchContext = createContext();

const initialState = {
  accessToken: null,
};

function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const actions = useActions(state, dispatch);

  return (
    <AppStateContext.Provider value={state}>
      <AppActionsContext.Provider value={actions}>
        <AppDispatchContext.Provider value={dispatch}>
          {children}
        </AppDispatchContext.Provider>
      </AppActionsContext.Provider>
    </AppStateContext.Provider>
  );
}

const SET_ACCESS_TOKEN = "SET_ACCESS_TOKEN";
const SET_USER = "SET_USER";

function reducer(state, action) {
  switch (action.type) {
    case SET_ACCESS_TOKEN:
      return { ...state, accessToken: action.payload };
    case SET_USER:
      return { ...state, user: action.payload };
    default:
      return state;
  }
}

function useActions(state, dispatch) {
  return {
    setAccessToken: (accessToken) => dispatch({ type: SET_ACCESS_TOKEN, payload: accessToken }),
    setUser: (user) => dispatch({ type: SET_USER, payload: user }),
  };
}

function useApp() {
  return {
    state: useContext(AppStateContext),
    actions: useContext(AppActionsContext),
    dispatch: useContext(AppDispatchContext),
  };
}

export { AppProvider, useApp };
