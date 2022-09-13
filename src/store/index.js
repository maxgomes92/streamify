import React, { createContext, useContext, useReducer } from 'react'

const AppStateContext = createContext()
const AppActionsContext = createContext()
const AppDispatchContext = createContext()

const initialState = {
  accessToken: null,
}

function AppProvider ({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)
  const actions = useActions(state, dispatch)

  return (
    <AppStateContext.Provider value={state}>
      <AppActionsContext.Provider value={actions}>
        <AppDispatchContext.Provider value={dispatch}>
          {children}
        </AppDispatchContext.Provider>
      </AppActionsContext.Provider>
    </AppStateContext.Provider>
  )
}

const SET_ACCESS_TOKEN = 'SET_ACCESS_TOKEN'

function reducer (state, action) {
  switch (action.type) {
    case SET_ACCESS_TOKEN:
      return {...state, accessToken: action.payload}
    default:
      return state
  }
}

function useActions (state, dispatch) {
  return {
    setAccessToken: (accessToken) => dispatch({ type: SET_ACCESS_TOKEN, payload: accessToken }),
  }
}

function useApp () {
  return {
    state: useContext(AppStateContext),
    actions: useContext(AppActionsContext),
    dispatch: useContext(AppDispatchContext),
  }
}

export {
  AppProvider,
  useApp,
}