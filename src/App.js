import { useState } from 'react';
import './App.css';
import Chat from './components/Chat';
import { Auth } from './components/Auth';
import Cookies from 'universal-cookie';
import { signOut } from 'firebase/auth'
import { Button } from '@material-ui/core';
import { auth } from './firebase-config';
import { Stack } from '@mui/material';

const cookies = new Cookies();

function App() {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));

  const signUserOut = async () => {
    await signOut(auth)
    cookies.remove("auth-token")
    setIsAuth(false)

  };

  if (!isAuth) {
    return (
      <>
        <Auth setIsAuth={setIsAuth} />
      </>
    );
  }
  return (
    <Stack direction="row" spacing={2}>
      <Chat />
      <div className='messenger-button'>
        <Button onClick={signUserOut}>Sign Out</Button>
      </div>
    </Stack>
  )
}

export default App;
