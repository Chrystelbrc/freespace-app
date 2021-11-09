import { QR_CODE_PREFIX } from '../config';

const QR_CODE_PREFIX_PATTERN = new RegExp(`^${QR_CODE_PREFIX}[0-9]+`);

export const isFreeSpaceQRCodeData = (qrCodeData) => {
	return QR_CODE_PREFIX_PATTERN.test(qrCodeData);
};

export const getRoomIndexFromQRCodeData = (qrCodeData) => {
	return qrCodeData.replace(QR_CODE_PREFIX, '');
};
