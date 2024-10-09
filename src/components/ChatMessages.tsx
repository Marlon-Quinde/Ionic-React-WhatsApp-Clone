import { IonContent, IonImg, IonPage } from '@ionic/react'
import React, { useContext } from 'react'
import { MessageI } from '../interfaces/message.interface'
import { Utility } from '../utility/Utility'
import { AppContext } from '../contexts/AppContext'

interface Props {
    chat: MessageI
}

export const ChatMessages = ({ chat}:Props) => {
  const {state, dispatch} = useContext(AppContext)

  const converted_image = chat.type === 'media' ? `data:image/jpeg;base64,${chat.file_url}` : ''


  return (
    <div className={ state.user.user_id == chat.sent_by ? 'chat-message-box-secondary' : 'chat-message-box-principal'}>
        {chat.type == 'media'&& <IonImg src={converted_image} />}
        {chat.message}
        <div className='message-time'>{Utility.getTime(chat.time)}</div>
    </div>
  )
}
