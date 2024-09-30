import { IonLoading } from '@ionic/react'
import React from 'react'

interface Props {
    showLoading: boolean;
    message: string
}

export const LoadingComponent = ({showLoading, message}:Props) => {
  return (
    <IonLoading
          isOpen={showLoading}
          message={message}
        />
  )
}
