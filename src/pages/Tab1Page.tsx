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
import React, { useContext, useState } from "react";
import { AppContext } from "../contexts/AppContext";
import { ChatItem } from "../components/ChatItem";
import { ContactI } from "../interfaces/user.interface";

export const Tab1 = () => {
  const { state, dispatch } = useContext(AppContext);

  return (
    <IonPage>
      <IonContent className="chat-screen">
        <IonList lines="full">
          {state.user.contacts.map((contact) => (
            <ChatItem contact={contact} key={contact.user_id} />
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};
