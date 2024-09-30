import { IonAvatar, IonItem, IonLabel } from "@ionic/react";
import React, { useContext, useEffect } from "react";
import { ContactI, UserI } from "../interfaces/user.interface";
import { useHistory } from "react-router";
import { AppContext } from "../contexts/AppContext";

interface Props {
    contact: ContactI
}

export const ChatItem = ({contact}:Props) => {

  const history = useHistory()

  const {state, dispatch} = useContext(AppContext)

  const goToChat = () => {
    dispatch({
      type: 'setNoTabs',
      payload: true
    })

    dispatch({
      type: 'setChattingWith',
      payload: contact
    })
    history.push('/chatpage')
  }

  
  return (
    <IonItem onClick={goToChat}>
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
