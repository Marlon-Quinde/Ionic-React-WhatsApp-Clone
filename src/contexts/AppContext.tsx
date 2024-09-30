import React, { createContext, useReducer } from "react";
import { AppAction, appReducer } from "./appReducer";
import { UserI } from "../interfaces/user.interface";

export interface AppState {
    appName: string
    user: UserI
}


interface AppContextProps {
    state: AppState
    dispatch: React.Dispatch<AppAction>
}

export const AppContext = createContext<AppContextProps>({} as AppContextProps)

const initialState: AppState = {
    appName: "WhatApp",
    user: localStorage.getItem('whatsapp-clone-user') ? JSON.parse(localStorage.getItem('whatsapp-clone-user')!) : undefined
}


interface Props{
    children: JSX.Element
}
export const AppContextProvider = ({children}:Props) => {
    const appState = {
        ...initialState
    }

    const [state, dispatch] = useReducer(appReducer, appState)

    const value: AppContextProps = {state, dispatch}

    return(
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}