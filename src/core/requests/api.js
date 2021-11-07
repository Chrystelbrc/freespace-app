import { API_URL } from '../config/index';

export const updateRoomStatus = ({ roomIndex, user }) => {
	const url = `${API_URL}/update-room-status/${roomIndex}/${user}`;
	return fetch(url, {
		method: 'PUT',
	}).then((response) => {
		return response.json();
	});
};
