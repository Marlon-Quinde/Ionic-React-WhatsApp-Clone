import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react'
import React, { useContext } from 'react'
import { AppContext } from '../contexts/AppContext'

export const Tab2 = () => {
    const {state, dispatch} = useContext(AppContext)
  return (
    <IonPage>
        <IonContent>
            <IonHeader  collapse='condense'>
                <IonToolbar>
                    <IonTitle size='large'> {state.appName } 2</IonTitle>
                </IonToolbar>
            </IonHeader>
        </IonContent>
    </IonPage>
  )
}
