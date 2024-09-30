import {
  IonAvatar,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useContext } from "react";
import { AppContext } from "../contexts/AppContext";

export const Tab3 = () => {
  const { state, dispatch } = useContext(AppContext);
  return (
    <IonPage>
      <IonContent className="chat-screen">
        
      </IonContent>
    </IonPage>
  );
};
