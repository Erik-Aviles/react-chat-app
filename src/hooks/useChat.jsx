import { useEffect, useState, useRef } from "react";
import socketIOClient from "socket.io-client";

const NEW_CHAT_message = "newMessage";
const SOCKET_SERVER = "http://localhost:3000";

export const useChat = (chatId) => {
  const [messages, setMessages] = useState([]);
  const socketRef = useRef()

  useEffect(() => {
    socketRef.current = socketIOClient(SOCKET_SERVER, {
      query: { chatId }
    });
    console.log( socketRef.current)

    socketRef.current.on(NEW_CHAT_message, (message) => {
      const incomingMessage = {
        ...message,
        sender: message.sendeId === socketRef.current.id,
      }
      
      setMessages((prevState) => [...prevState, incomingMessage])
    })
    
    return () => {
      socketRef.current.disconnect()
    }
  }, [chatId])
  
  const sendMessage = (messageBody) => {
    socketRef.current.emit(NEW_CHAT_message, {
      text: messageBody,
      sendeId: socketRef.current.id,
      hour: `${new Date().getHours()}:${new Date().getMinutes()}`,
    })
  }
  
  return { messages, sendMessage }
}