import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { ThemeProvider } from 'wireframe-ui';
import './App.css';
import { Login } from './components/pages/login';
import { Home } from './components/pages/home';
import { Board } from './components/pages/board';
import { Scan } from './components/pages/scan';

function App() {
	const [user, setUser] = useState(localStorage.getItem('user') || '');

	const handleUserLogout = () => {
		setUser('');
	};

	useEffect(() => {
		localStorage.setItem('user', user);
	}, [user]);

	const showBoard = window.location.pathname === '/board';
	const showScan = window.location.pathname.match(/^\/scan/);

	return (
		<ThemeProvider>
			{showBoard && <Board />}
			{!showBoard && !user && <Login onUserSet={setUser} />}
			{!showBoard && !showScan && !!user && (
				<Home user={user} onUserLogout={handleUserLogout} />
			)}
			{showScan && !showBoard && <Scan user={user} />}
			<ToastContainer
				position="bottom-right"
				autoClose={3000}
				hideProgressBar
				newestOnTop
				closeOnClick
				pauseOnVisibilityChange
				draggable
				pauseOnHover
			/>
		</ThemeProvider>
	);
}

export default App;
