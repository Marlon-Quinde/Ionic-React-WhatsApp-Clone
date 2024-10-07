import { IonContent, IonPage } from '@ionic/react'
import React, { useContext } from 'react'
import { MessageI } from '../interfaces/message.interface'
import { Utility } from '../utility/Utility'
import { AppContext } from '../contexts/AppContext'

interface Props {
    chat: MessageI
}

export const ChatMessages = ({ chat}:Props) => {
  const {state, dispatch} = useContext(AppContext)

  if (state.user.user_id == chat.sent_by) {
    return (
      <div className="chat-message-box-secondary">
        {chat.message}
        <div className='message-time'>{Utility.getTime(chat.time)}</div>
    </div>
    )
  }
  return (
    <div className="chat-message-box-principal ">
        {chat.message}
        <div className='message-time'>{Utility.getTime(chat.time)}</div>
    </div>
  )
}
