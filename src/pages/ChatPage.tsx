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
import { MessageI } from "../interfaces/message.interface";
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

export const ChatPage = () => {
  const { state, dispatch } = useContext(AppContext);
  const history = useHistory();
  const [message, setMessage] = useState<string | null>();
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
      console.log(messages);
    });
  };

  const sendMessage = async () => {
    try {
      if (message) {
        const messageBody: MessageI = {
          message_id: Utility.getRandom(),
          sent_by: state.user.user_id,
          channel: `${state.user.user_id},${state.chattingWith.user_id}`,
          type: "text",
          message,
          file_url: null,
          time: new Date(),
        };

        await addDoc(collection(db, "messages"), messageBody);

        setMessage(null);
      }
    } catch (error) {
      new Error("Ocurio un error al enviar el mensaje", error as any);
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
                      <IonIcon icon={happyOutline} size="large"></IonIcon>
                    </IonCol>
                    <IonCol size="8">
                      <IonInput
                        value={message}
                        onIonChange={(e) => setMessage(e.detail.value)}
                        placeholder="Type a message"
                      ></IonInput>
                    </IonCol>
                    <IonCol size="2">
                      <IonIcon
                        className="media-icon"
                        icon={linkOutline}
                        size="large"
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
