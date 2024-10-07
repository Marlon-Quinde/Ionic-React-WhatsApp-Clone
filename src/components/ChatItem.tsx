import { IonAvatar, IonItem, IonLabel, useIonViewDidEnter, useIonViewWillLeave } from "@ionic/react";
import React, { useContext, useEffect, useRef, useState } from "react";
import { ContactI, UserI } from "../interfaces/user.interface";
import { useHistory } from "react-router";
import { AppContext } from "../contexts/AppContext";
import { MessageI } from "../interfaces/message.interface";
import { collection, limit, onSnapshot, orderBy, query, Unsubscribe, where } from "firebase/firestore";
import { db } from "../config/firebaseConexion";

interface Props {
    contact: ContactI
}

export const ChatItem = ({contact}:Props) => {

  const history = useHistory()

  const {state, dispatch} = useContext(AppContext)
  const [lastMessage, setLastMessage] = useState<MessageI | undefined>(undefined)
  const messageSubscription = useRef<Unsubscribe | null>(null)

  const goToChat = () => {
    dispatch({
      type: 'setNoTabs',
      payload: true
    });

    dispatch({
      type: 'setChattingWith',
      payload: contact
    });
    localStorage.setItem('current_contact',JSON.stringify(contact))
    history.push('/chatpage')
  }

  useIonViewDidEnter(() => {
    const channel1 = `${state.user.user_id},${contact.user_id}`;
    const channel2 = `${contact.user_id},${state.user.user_id}`;
    const q = query(collection(db, 'messages'), where('channel', 'in', [channel1, channel2]), orderBy('time', 'desc'), limit(1))
    messageSubscription.current = onSnapshot(q, (querySnapshot) => {
      if (querySnapshot.docs.length) {
        const messages = querySnapshot.docs.map((message) => message.data() as MessageI
        )
        setLastMessage(messages[0])
      }
    })

  })

  useIonViewWillLeave(() => {
    if(messageSubscription.current){
      messageSubscription.current();
    }
  })

  const messageLast = async () => {
    
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
        <p>{lastMessage?.message}</p>
      </IonLabel>
    </IonItem>
  );
};
