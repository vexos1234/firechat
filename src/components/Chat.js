import React, { useEffect, useState } from 'react';
import { addDoc, collection, serverTimestamp, onSnapshot, query, orderBy } from 'firebase/firestore';
import { auth, db } from '../firebase-config';
import "../styles/Chat.css";
import { Box, Grid } from '@material-ui/core';
import { Stack } from '@mui/material';
import { useRef } from 'react';

function Chat() {
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);

  function ScrollToBottom() {
    const elementRef = useRef();
    useEffect(() => elementRef.current.scrollIntoView());
    return <div ref={elementRef} />;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newMessage === "") return;
    //Posting messages in Firebase sintaxis
    await addDoc(messagesRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: auth.currentUser.displayName,
    });
    setNewMessage("")
  };

  // Query messages from db
  const messagesRef = collection(db, "messages")

  useEffect(() => {
    const queryMessages = query(
      messagesRef,
      orderBy("createdAt")
    )
    const unsuscribe = onSnapshot(queryMessages, (snapshot) => {
      let messages = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id })
      })
      setMessages(messages);
    });

    return () => unsuscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Grid /*container justifyContent="flex-end"*/>
      {/* Chat */}

      {/* messages box */}
      <Box>
      <div classname="header">
        <h1>Chat DEMO</h1>
      </div>
        <Box sx={{ overflow: 'auto', height: '70vh', width: '70vh', marginLeft: '20px' }}>
          <Stack sx={{padding: 1}}>
            <div className='columm'>
              {" "}
              {messages.map((message =>
                <div className='message' key={message.id}>
                  <span className="user">&nbsp;&nbsp;{message.user}</span>
                  <div className='message-1'>  
                  &nbsp;{message.text}&nbsp;
                  </div>
                  <ScrollToBottom />
                </div>
              ))}
            </div>
          </Stack>
        </Box>

        <Box>
          <div className='new-message-input'>
            <form onSubmit={handleSubmit}>
              <input
                className='messenger-input'
                placeholder="Type your message here"
                onChange={(e) => setNewMessage(e.target.value)}
                value={newMessage}
              >
              </input>
              <button type="submit" className='send-button'>Send</button>
            </form>
          </div>
        </Box>
      </Box>

    </Grid>
  )
}

export default Chat