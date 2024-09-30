import { AppState } from "./AppContext";

export interface AppAction {
  type: TypeAppAction;
  payload: any;
}

type TypeAppAction = "setAppName" | "loadUser";

export const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case "setAppName":
      return {
        ...state,
        appName: action.payload,
      };
    case "loadUser":
      const user = action.payload
      localStorage.setItem('whatsapp-clone-user', JSON.stringify(user))

      return {
        ...state,
        user,

      };
    default:
      return state;
  }
};
