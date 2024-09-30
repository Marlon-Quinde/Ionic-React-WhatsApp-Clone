import { AppState } from "./AppContext";

export interface AppAction {
  type: TypeAppAction;
  payload: any;
}

type TypeAppAction = "setAppName" | "loadUser" | "setNoTabs" | "setChattingWith";

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
    case "setNoTabs":
      return {
        ...state,
        noTabs: action.payload
      }
    case "setChattingWith":
      return {
        ...state,
        chattingWith: action.payload
      }
    default:
      return state;
  }
};
