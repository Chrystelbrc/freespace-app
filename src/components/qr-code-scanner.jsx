import QRReader from 'react-qr-reader';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { updateRoomStatus } from '../core/requests/api';
import {
	getRoomIndexFromQRCodeData,
	isFreeSpaceQRCodeData,
} from '../core/selectors/qr-code-data';

const styles = {
	camera: {
		width: '100%',
	},
};

const MESSAGES = {
	ERROR: {
		NOT_ALLOWED: 'You have disallowed camera access',
		NOT_FOUND: 'Scanned room not found',
		ROOM_ALREADY_BOOKED: 'Scanned room has been booked by another one',
		NETWORK_ERROR: 'An network error occured',
	},
	WARNING: {
		INVALID_QR_CODE: 'Invalid QR code',
	},
	CONFIRM: {
		BOOKED: 'The scanned room has been successfully booked',
		UNBOOKED: 'The scanned room has been successfully unbooked',
	},
	INFO: {
		QR_CODE_FOUND: 'QR Code found',
		READY: 'Ready to scan',
	},
};

export const QRCodeScanner = ({ user, onClose }) => {
	const handleQRCodeScan = (qrCodeData) => {
		if (!qrCodeData) {
			return;
		}

		toast.info(MESSAGES.INFO.QR_CODE_FOUND);
		if (!isFreeSpaceQRCodeData(qrCodeData)) {
			// QR Code is not from us
			toast.warning(`${MESSAGES.WARNING.INVALID_QR_CODE} (${qrCodeData})`);
			return;
		}

		const qrCodeRoomIndex = getRoomIndexFromQRCodeData(qrCodeData);

		if (!qrCodeRoomIndex) {
			// QR Code is not valid
			toast.warning(MESSAGES.WARNING.INVALID_QR_CODE);
			return;
		}

		updateRoomStatus({ roomIndex: qrCodeRoomIndex, user }).then(
			(updatedRoom) => {
				toast.success(
					updatedRoom.isFree
						? MESSAGES.CONFIRM.UNBOOKED
						: MESSAGES.CONFIRM.BOOKED
				);
				onClose();
			},
			(error) => {
				if (error.status === 404) {
					toast.error(MESSAGES.ERROR.NOT_FOUND);
					return;
				}
				if (error.status === 400) {
					toast.error(MESSAGES.ERROR.ROOM_ALREADY_BOOKED);
					return;
				}

				toast.error(MESSAGES.ERROR.NETWORK_ERROR);
				return;
			}
		);
	};

	const handleLoad = () => {
		toast.info(MESSAGES.INFO.READY);
	};

	const handleNotAllowedError = () => {
		// User denied access to camera
		toast.error(MESSAGES.ERROR.NOT_ALLOWED);
	};

	return (
		<QRReader
			delay={1000}
			facingMode={'environment'}
			style={styles.camera}
			onError={handleNotAllowedError}
			onScan={handleQRCodeScan}
			onLoad={handleLoad}
			showViewFinder={false}
		/>
	);
};
