import { API_URL } from '../config/index';

export const updateRoomStatus = ({ roomIndex, user }) => {
	const url = `${API_URL}/update-room-status/${roomIndex}/${user}`;
	return fetch(url, {
		method: 'PUT',
	}).then((response) => {
		return response.json();
	});
};

export const reportUser = ({
	reportedUserName,
	reporterUserName,
	roomIndex,
}) => {
	const url = `${API_URL}/report?reportedUserName=${reportedUserName}&reporterUserName=${reporterUserName}&roomIndex=${roomIndex}`;
	return fetch(url, {
		method: 'POST',
	}).then((response) => {
		return response.json();
	});
};
