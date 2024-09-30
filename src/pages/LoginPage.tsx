import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLoading,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useState, useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import { LoadingComponent } from "../components/Loading";
import { getFirestore, collection, getDocs, getDoc, query, where } from 'firebase/firestore/lite';
import { db } from "../config/firebaseConexion";

export const LoginPage = () => {
  const [passcode, setPasscode] = useState<string | null>();
  const { state, dispatch } = useContext(AppContext);
  const [showLoading, setShowLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('')

  const login = async () => {
    setShowLoading(true)
    setMessage('Please wait...')


    let user
    const userCol = query(collection(db, 'users'), where("passcode", '==', passcode))
    const querySnapshot = await getDocs(userCol)
    
    querySnapshot.forEach((doc) => {
      user = doc.data()
      user.id = doc.id
      console.log(user)
    });

    dispatch({type: 'loadUser', payload: user})
    setShowLoading(false)

  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="login-bar">
          <IonTitle>Two-step verification</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="text-center w-10/12 mt-[20px] mx-auto leading-[1.4rem] font-">
          Enter a four digit passcode which you'all be asked for when you
          register your phone number with WhatsApp-Clone:
        </div>
        <div className="w-6/12 mx-auto">
          <IonItem className="passcode-input">
            <IonInput
              value={passcode}
              onIonChange={(e) => setPasscode(e.detail.value)}
            ></IonInput>
          </IonItem>
        </div>
        <IonButton
          className="login-button"
          onClick={login}
          disabled={!passcode}
        >
          Login
        </IonButton>
        <LoadingComponent showLoading={showLoading} message={message}/>
      </IonContent>
    </IonPage>
  );
};
