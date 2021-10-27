import { useState } from 'react';
import './App.css';
import { Login } from './components/login';
import { RoomsList } from './components/rooms/rooms-list';

function App() {
  const [user, setUser] = useState('');

  if (!user) {
    return <Login user={user} onUserSet={setUser} />;
  }
  return (
    <>
      {!!user && <p>{user}</p>}
      <RoomsList user={user} />
    </>
  );
}

export default App;
