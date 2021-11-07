import { useState, useEffect } from 'react';
import './App.css';
import { Login } from './components/login';
import { RoomsList } from './components/rooms/rooms-list';

function App() {
	const [user, setUser] = useState(localStorage.getItem('user'));

	useEffect(() => {
		localStorage.setItem('user', user);
	}, [user]);

	if (!user) {
		return <Login onUserSet={setUser} />;
	}
	return (
		<>
			{!!user && <p>{user}</p>}
			<RoomsList user={user} />
		</>
	);
}

export default App;
