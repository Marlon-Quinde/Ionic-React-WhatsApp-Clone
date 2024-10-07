import React, { createContext, useReducer } from "react";
import { AppAction, appReducer } from "./appReducer";
import { ContactI, UserI } from "../interfaces/user.interface";

export interface AppState {
    appName: string
    user: UserI
    noTabs: boolean
    chattingWith: ContactI
}


interface AppContextProps {
    state: AppState
    dispatch: React.Dispatch<AppAction>
}

export const AppContext = createContext<AppContextProps>({} as AppContextProps)

const initialState: AppState = {
    appName: "WhatApp",
    user: localStorage.getItem('whatsapp-clone-user') ? JSON.parse(localStorage.getItem('whatsapp-clone-user')!) : undefined,
    noTabs: false,
    chattingWith: localStorage.getItem('current_contact') ? JSON.parse(localStorage.getItem('current_contact')!) : undefined
    
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