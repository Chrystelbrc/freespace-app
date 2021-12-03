import QRReader from 'react-qr-reader';
import { StyleSheet, css } from 'aphrodite/no-important';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Modal, View, ModalBar } from 'wireframe-ui';
import { MdQrCode2 } from 'react-icons/md';
import { BiFullscreen } from 'react-icons/bi';
import { updateRoomStatus } from '../core/requests/api';
import {
	getRoomIndexFromQRCodeData,
	isFreeSpaceQRCodeData,
} from '../core/selectors/qr-code-data';

const cameraStyle = {
	width: `100%`,
};

const styles = StyleSheet.create({
	modal: {
		maxWidth: '50vw',
		width: '95vh',
		margin: 'calc(var(--wireframe-spacing-element) * 2)',
		'@media (orientation: portrait)': {
			width: 'calc(95vw - var(--wireframe-spacing-element) * 4)',
			maxWidth: 'none',
		},
	},
	qrCodeInlayView: {
		position: 'absolute',
		top: 'var(--wireframe-dimension-m)',
		left: 0,
		right: 0,
		bottom: 0,
		alignItems: 'center',
		justifyContent: 'center',
	},
	qrCodeInlayIcon: {
		width: '100%',
		height: '100%',
		color: 'rgba(255, 255, 255, 0.5)',
	},
});

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
					updatedRoom.userName
						? MESSAGES.CONFIRM.BOOKED
						: MESSAGES.CONFIRM.UNBOOKED
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
		<Modal styleDefinitions={[styles.modal]}>
			<ModalBar
				onClose={onClose}
				ModalTitleIcon={MdQrCode2}
				modalTitle="Scan the code"
			/>
			<QRReader
				delay={1000}
				facingMode={'environment'}
				style={cameraStyle}
				onError={handleNotAllowedError}
				onScan={handleQRCodeScan}
				onLoad={handleLoad}
				showViewFinder={false}
			/>
			<View styleDefinitions={[styles.qrCodeInlayView]}>
				<BiFullscreen className={css(styles.qrCodeInlayIcon)} />
			</View>
		</Modal>
	);
};
