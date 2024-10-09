import {
  IonContent,
  IonHeader,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTab,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { playCircle, radio, library, search } from "ionicons/icons";
import { Redirect, Route } from "react-router";
import { ChatListPage } from "../pages/ChatListPage";
import { Tab2 } from "../pages/Tab2Page";
import { Tab3 } from "../pages/Tab3Page";
import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import { ChatPage } from "../pages/ChatPage";

export const TabsNavigation = () => {
  const { state, dispatch } = useContext(AppContext);
  return (
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/chats" component={ChatListPage}></Route>
          <Route exact path="/tab2" component={Tab2}></Route>
          <Route exact path="/tab3" component={Tab3}></Route>
          <Route exact path="/chatpage" component={ChatPage}></Route>
          <Route exact path="/">
            <Redirect to="/chats" />
          </Route>
        </IonRouterOutlet>
        { !state.noTabs && <IonTabBar slot="top" className="menu-bar">
            <IonTabButton tab="chats" href="/chats" className="tabButton">
              <IonLabel>CHATS</IonLabel>
            </IonTabButton>
            <IonTabButton tab="tab2" href="/tab2" className="tabButton">
              <IonLabel>STATUS</IonLabel>
            </IonTabButton>
            <IonTabButton tab="tab3" href="/tab3" className="tabButton">
              <IonLabel>CALLS</IonLabel>
            </IonTabButton>
          </IonTabBar>}
      </IonTabs>
    </IonReactRouter>
  );
};
