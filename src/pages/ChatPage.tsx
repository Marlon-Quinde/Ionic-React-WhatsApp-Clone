import {
  IonAvatar,
  IonButton,
  IonCol,
  IonContent,
  IonFooter,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
  useIonViewWillLeave,
} from "@ionic/react";
import React, { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../contexts/AppContext";
import {
  happyOutline,
  linkOutline,
  logoSnapchat,
  sendSharp,
} from "ionicons/icons";
import { Utility } from "../utility/Utility";
import { MessageI, MessageType } from "../interfaces/message.interface";
import {
  addDoc,
  collection,
  limit,
  orderBy,
  query,
  where,
  onSnapshot,
  getDocs,
  getDoc,
  doc,
  DocumentData,
  QueryDocumentSnapshot,
  Unsubscribe,
} from "firebase/firestore";
import { useHistory } from "react-router";
import { db } from "../config/firebaseConexion";
import { ChatMessages } from "../components/ChatMessages";
import { Capacitor, CapacitorException } from "@capacitor/core";
import { Camera, CameraResultType } from '@capacitor/camera';

export const ChatPage = () => {
  const { state, dispatch } = useContext(AppContext);
  const history = useHistory();
  const [message, setMessage] = useState<string>('');
  const [chatMessages, setChatMessages] = useState<MessageI[]>([]);
  let messageSubscription = useRef<Unsubscribe | null>(null);

  useIonViewWillEnter(() => {
    if (!state.noTabs) {
      dispatch({
        type: "setNoTabs",
        payload: true,
      });
    }
    if (!localStorage.getItem("current_contact")) {
      history.push("/tab1");
    }
    messageChannel();
  });

  useIonViewWillLeave(() => {
    dispatch({
      type: "setNoTabs",
      payload: false,
    });
    if (messageSubscription.current) {
      messageSubscription.current();
    }
  });

  const messageChannel = async () => {
    const channel1 = `${state.user.user_id},${state.chattingWith.user_id}`;
    const channel2 = `${state.chattingWith.user_id},${state.user.user_id}`;
    const q = query(
      collection(db, "messages"),
      where("channel", "in", [channel1, channel2]),
      orderBy("time", "asc"),
      limit(100)
    );

    messageSubscription.current = onSnapshot(q, (querySnapshot) => {
      const messages: MessageI[] = querySnapshot.docs.map(
        (doc) => doc.data() as MessageI
      );
      setChatMessages(messages);
      
    });
  };

  const sendMessage = async (type: MessageType = 'text', file_url: string = '') => {
    try {
      if (message || type === 'media') {
        const messageBody: MessageI = {
          message_id: Utility.getRandom(),
          sent_by: state.user.user_id,
          channel: `${state.user.user_id},${state.chattingWith.user_id}`,
          type,
          message,
          file_url,
          time: new Date(),
        };
        console.log(messageBody)

        await addDoc(collection(db, "messages"), messageBody);

        setMessage('');
      }
    } catch (error) {
      new Error("Ocurio un error al enviar el mensaje", error as any);
    }
  };

  const getImage = async () => {
    try {
      const isAvailable = Capacitor.isPluginAvailable("Camera");
      if (!isAvailable) {
        
        // Have the user upload a file instead
      } else {
        // Otherwise, make the call:
        if (Capacitor.isNativePlatform()) {
          // do something
        }
        const image = await Camera.getPhoto({quality: 90, allowEditing: false, resultType: CameraResultType.Base64})
        await sendMessage('media', image.base64String);
      }
    } catch (error) {
      if (error instanceof CapacitorException && error.message === 'User cancelled photos app') {
        console.log('El usuario ha cancelado la acción de seleccionar una foto');
        
      } else {
        console.error('Error al seleccionar una foto:', error);
      }
    }
    
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="login-bar">
          <IonItem className="menu-bar">
            <IonAvatar className="w-[40px] h-[40px] ml-2">
              <img
                src={state.chattingWith?.avatar}
                alt={
                  "https://play-lh.googleusercontent.com/60NN6l06lSfCFjJRQog7Vh4JlswDA0p2zF_vRjMlIz7NUwPt_wQlcCNsP7X0c9eZMHk=w240-h480"
                }
              />
            </IonAvatar>
            <IonTitle>{state.chattingWith?.name}</IonTitle>
          </IonItem>
        </IonToolbar>
      </IonHeader>
      <IonContent className="chat-page-content">
        {chatMessages.length
          ? chatMessages.map((chat) => (
              <ChatMessages key={chat.message_id} chat={chat} />
            ))
          : "No messages"}
      </IonContent>
      <IonFooter>
        <IonToolbar>
          <IonGrid>
            <IonRow>
              <IonCol size="10">
                <IonGrid>
                  <IonRow>
                    <IonCol size="2">
                      <IonIcon
                        icon={happyOutline}
                        size="large"
                      ></IonIcon>
                    </IonCol>
                    <IonCol size="8">
                      <IonInput
                        value={message}
                        onIonChange={(e) => setMessage(e.detail.value ?? '')}
                        placeholder="Type a message"
                      ></IonInput>
                    </IonCol>
                    <IonCol size="2">
                      <IonIcon
                        className="media-icon"
                        icon={linkOutline}
                        size="large"
                        onClick={getImage}
                      ></IonIcon>
                    </IonCol>
                  </IonRow>
                </IonGrid>
              </IonCol>
              <IonCol size="2">
                <IonButton
                  onClick={() => sendMessage()}
                  className="chat-send-button"
                >
                  <IonIcon icon={sendSharp}></IonIcon>
                </IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};
