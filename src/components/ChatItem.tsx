import { IonAvatar, IonItem, IonLabel } from "@ionic/react";
import React from "react";
import { ContactI, UserI } from "../interfaces/user.interface";

interface Props {
    contact: ContactI
}

export const ChatItem = ({contact}:Props) => {
  return (
    <IonItem>
      <IonAvatar slot="start">
        <img
          src={contact.avatar ?? 'https://play-lh.googleusercontent.com/60NN6l06lSfCFjJRQog7Vh4JlswDA0p2zF_vRjMlIz7NUwPt_wQlcCNsP7X0c9eZMHk=w240-h480'}
          alt="icon"
        />
      </IonAvatar>
      <IonLabel>
        <h2>{contact.name} </h2>
        <p>{contact.user_id}</p>
      </IonLabel>
    </IonItem>
  );
};
