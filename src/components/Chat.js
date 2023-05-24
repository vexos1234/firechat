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

  function ScrollToBottom(){
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
      <Grid>
        {/* Chat */}

        <div classname="header">
          <h1>Chat DEMO</h1>
        </div>

        {/* messages box */}
        <Box sx={{ overflow: 'scroll', height: '50vh', width: '50vh' }}>
          <Stack>
            <div>
                {" "}
                {messages.map((message =>
                  <div className="message-1" key={message.id}>
                    <span className="user">&nbsp;&nbsp;{message.user}</span>
                    {message.text}&nbsp;&nbsp;
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
                placeholder="Type your message here"
                onChange={(e) => setNewMessage(e.target.value)}
                value={newMessage}
              >
              </input>
              <button type="submit" className='send-button'>Send</button>
            </form>
          </div>
        </Box>
      </Grid>
  )
}

export default Chat