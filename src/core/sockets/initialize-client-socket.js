import socketIOClient from 'socket.io-client';
import { API_URL } from '../config';

export const initializeClientSocket = ({
	connectionQuery,
	onConnect,
	onGetAllRooms,
	onRoomUpdate,
	onGetAllUsers,
	onUserUpdate,
}) => {
	const socket = socketIOClient(API_URL, {
		query: connectionQuery,
		// transports: ['websocket'],
	});

	onConnect();

	socket.on('getAllRooms', onGetAllRooms);
	socket.on('roomUpdate', onRoomUpdate);
	socket.on('getAllUsers', onGetAllUsers);
	socket.on('userUpdate', onUserUpdate);

	return socket;
};
