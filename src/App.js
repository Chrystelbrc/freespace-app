import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import './App.css';
import { Login } from './components/login';
import { QRCodeScanner } from './components/qr-code-scanner';
import { RoomsList } from './components/rooms/rooms-list';
import { LoggedUser } from './components/user/logged-user';

const styles = {
	wrapper: {
		display: 'flex',
		flexDirection: 'column',
	},
	qrCodeWrapper: {
		width: '100%',
		maxWidth: '100vh',
		alignSelf: 'center',
	},
};

function App() {
	const [user, setUser] = useState(localStorage.getItem('user') || '');
	const [hasUserBooked, setHasUserBooked] = useState(false);
	const [isQRCodeScannerEnabled, setIsQRCodeScannerEnabled] = useState(false);
	const handleUserBook = () => setHasUserBooked(true);
	const handleUserUnbook = () => setHasUserBooked(false);
	const handleOpenQRCodeScanner = () => setIsQRCodeScannerEnabled(true);
	const handleCloseQRCodeScanner = () => setIsQRCodeScannerEnabled(false);

	const handleUserLogout = () => {
		setUser('');
	};

	useEffect(() => {
		localStorage.setItem('user', user);
	}, [user]);

	return (
		<div style={styles.wrapper}>
			{!user && <Login onUserSet={setUser} />}
			{!!user && !isQRCodeScannerEnabled && (
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

			{!!user && isQRCodeScannerEnabled && (
				<div onClick={handleCloseQRCodeScanner} style={styles.qrCodeWrapper}>
					<QRCodeScanner user={user} onClose={handleCloseQRCodeScanner} />
				</div>
			)}
			<LoggedUser user={user} onLogout={handleUserLogout} />
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
		</div>
	);
}

export default App;
