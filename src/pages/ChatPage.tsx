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
import React, { useContext, useEffect } from "react";
import { AppContext } from "../contexts/AppContext";
import { happyOutline, linkOutline, sendSharp } from "ionicons/icons";

export const ChatPage = () => {
  const { state, dispatch } = useContext(AppContext);

  useIonViewWillEnter(() => {
    if(!state.noTabs){
        dispatch({
            type: 'setNoTabs',
            payload: true
        })
    }
  })

  useIonViewWillLeave(() => {
    dispatch({
        type: 'setNoTabs',
        payload: false
    })
  })

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="login-bar">
          <IonItem className="menu-bar">
            <IonAvatar className="w-[40px] h-[40px] ml-2">
              <img
                src={state.chattingWith?.avatar}
                alt={'https://play-lh.googleusercontent.com/60NN6l06lSfCFjJRQog7Vh4JlswDA0p2zF_vRjMlIz7NUwPt_wQlcCNsP7X0c9eZMHk=w240-h480'}
              />
            </IonAvatar>
            <IonTitle>{state.chattingWith?.name}</IonTitle>
          </IonItem>
        </IonToolbar>
      </IonHeader>
      <IonContent>Hey, this is the chat page</IonContent>
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
                                    <IonInput placeholder="Type a message"></IonInput>
                                </IonCol>
                                <IonCol size="2">
                                    <IonIcon className="media-icon" icon={linkOutline} size="large"></IonIcon>
                                </IonCol>
                            </IonRow>
                        </IonGrid>
                    </IonCol>  
                    <IonCol size="2">
                        <IonButton className="chat-send-button">
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
