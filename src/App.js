import { useState, useEffect } from 'react';
import './App.css';
import { Login } from './components/login';
import { QRCodeScanner } from './components/qr-code-scanner';
import { RoomsList } from './components/rooms/rooms-list';

function App() {
  const [user, setUser] = useState(localStorage.getItem('user'));
	const [hasUserBooked, setHasUserBooked] = useState(false);
	useState(false);
	const [isQRCodeScannerEnabled, setIsQRCodeScannerEnabled] = useState(false);
	const handleUserBook = () => setHasUserBooked(true);
	const handleUserUnbook = () => setHasUserBooked(false);
	const handleOpenQRCodeScanner = () => setIsQRCodeScannerEnabled(true);
	const handleCloseQRCodeScanner = () => setIsQRCodeScannerEnabled(false);
  
  useEffect(() => {
		localStorage.setItem('user', user);
	}, [user]);

	if (!user) {
		return <Login onUserSet={setUser} />;
	}
	return (
		<>
			{!!user && <p>{user}</p>}
			{!isQRCodeScannerEnabled && (
				<>
					<RoomsList
						user={user}
						hasUserBooked={hasUserBooked}
						onUserBook={handleUserBook}
						onUserUnbook={handleUserUnbook}
					/>
					{!hasUserBooked && (
						<button onClick={handleOpenQRCodeScanner}>Scan a QRCode</button>
					)}
				</>
			)}

			{isQRCodeScannerEnabled && (
				<>
					<QRCodeScanner user={user} />
					<button onClick={handleCloseQRCodeScanner}>Close</button>
				</>
			)}
		</>
	);
}

export default App;
