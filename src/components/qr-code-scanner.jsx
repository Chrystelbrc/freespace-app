import { useState, useEffect } from 'react';
import QRReader from 'react-qr-reader';
import { updateRoomStatus } from '../core/requests/api';
import {
	getRoomIndexFromQRCodeData,
	isFreeSpaceQRCodeData,
} from '../core/selectors/qr-code-data';

const styles = {
	wrapper: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	},
	camera: {
		width: '100%',
		maxWidth: 350,
	},
};

const ERROR = {
	NOT_SUPPORTED: 'Unsupported device',
	NOT_ALLOWED: 'You have disallowed camera access',
	NOT_FOUND: 'Scanned room not found',
	ROOM_ALREADY_BOOKED: 'Scanned room has been booked by another one',
	NETWORK_ERROR: 'An network error occured',
};

const WARNING = {
	INVALID_QR_CODE: 'Invalid QR code',
};

const CONFIRM = {
	BOOKED: 'The scanned room has been successfully booked',
	UNBOOKED: 'The scanned room has been successfully unbooked',
};

const onGetUserMediaVideoNotAllowedError = (onError) => {
	navigator.mediaDevices.getUserMedia({ video: true }).catch((error) => {
		if (error.name === 'NotAllowedError') {
			// User denied access to camera
			onError();
		}
	});
};

export const QRCodeScanner = ({ user }) => {
	const [isLoading, setIsLoading] = useState(true);
	const [errorMessage, setErrorMessage] = useState(null);
	const [warningMessage, setWarningMessage] = useState(null);
	const [confirmMessage, setConfirmMessage] = useState(null);

	const handleQRCodeScan = (qrCodeData) => {
		if (!qrCodeData) {
			return;
		}
		if (!isFreeSpaceQRCodeData(qrCodeData)) {
			// QR Code is not from us
			setWarningMessage(WARNING.INVALID_QR_CODE);
			return;
		}

		const qrCodeRoomIndex = getRoomIndexFromQRCodeData(qrCodeData);

		if (!qrCodeRoomIndex) {
			// QR Code is not valid
			setWarningMessage(WARNING.INVALID_QR_CODE);
			return;
		}

		updateRoomStatus({ roomIndex: qrCodeRoomIndex, user }).then(
			(updatedRoom) => {
				setConfirmMessage(
					updatedRoom.isFree ? CONFIRM.UNBOOKED : CONFIRM.BOOKED
				);
			},
			(error) => {
				debugger;
				if (error.status === 404) {
					setErrorMessage(ERROR.NOT_FOUND);
					return;
				}
				if (error.status === 400) {
					setErrorMessage(ERROR.ROOM_ALREADY_BOOKED);
					return;
				}

				setErrorMessage(ERROR.NETWORK_ERROR);
				return;
			}
		);
	};

	const handleError = (error) => {
		setErrorMessage(ERROR.NOT_SUPPORTED);
	};

	const handleLoad = () => {
		setIsLoading(false);
	};

	const handleNotAllowedError = () => {
		// User denied access to camera
		setErrorMessage(ERROR.NOT_ALLOWED);
	};

	useEffect(() => {
		onGetUserMediaVideoNotAllowedError(handleNotAllowedError);
	}, []);

	if (errorMessage) {
		return <div>{errorMessage}</div>;
	}

	return (
		<div style={styles.wrapper}>
			{!!warningMessage && <div>{warningMessage}</div>}
			{!!confirmMessage && <div>{confirmMessage}</div>}
			<QRReader
				// delay={500}
				// facingMode={'environment'}
				// resolution={600}
				style={styles.camera}
				onError={handleError}
				onScan={handleQRCodeScan}
				onLoad={handleLoad}
			/>
			{isLoading && 'Loading...'}
		</div>
	);
};
