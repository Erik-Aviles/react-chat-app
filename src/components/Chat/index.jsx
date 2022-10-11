import React, { useState } from 'react';
import { useParams } from "react-router-dom";
import { Message } from '../Messages';
import { MdSend } from "react-icons/md";
import { useChat } from '../../hooks/useChat';

import styles from './styles.module.css';

export const Chat = () => {
  const { id } = useParams();
  const { messages, sendMessage } = useChat(id);

  const handleSubmit = (e) =>{
    e.preventDefault()
    sendMessage(e.target.myMessage.value);
  }

  return (
    <div className={styles.chat}>
      <header className={styles.header}>
        <p> Conversation with chat id: { id }</p>
      </header>
      <ol className={styles.messages}>
        {messages.length === 0 ?
        <>
          <Message text={"Hola, que tal... como has pasado"} hour='13:00' sender={true} />
          <Message text={"Muy bien, casi que te escribia"} hour='13:30' sender={false} />
        </> : 
        messages.map(message => <Message {...message} />) 
        }
      </ol>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input type="text" name='myMessage' placeholder='Write a message' />
        <button type='submit'><MdSend /></button>
      </form>
    </div>
  )
}


