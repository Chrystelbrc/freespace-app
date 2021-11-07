import { useState, useEffect } from 'react';
import { RoomItem } from './room-item';

export const RoomsList = ({
	user,
	onUserBook,
	onUserUnbook,
	hasUserBooked,
}) => {
	const [rooms, setRooms] = useState([]);

	useEffect(() => {
		fetch('http://localhost:3001/fetch-all-rooms')
			.then((response) => {
				return response.json();
			})
			.then((rooms) => {
				setRooms(rooms);
				// Check if current user has already booked
				if (
					rooms.some((room) => {
						return room.userName === user;
					})
				) {
					onUserBook();
					return;
				}
				onUserUnbook();
			})
			.catch((error) => {
				console.error(error);
			});
	}, []);

	const handleRoomUpdate = (updatedRoomIndex, updatedRoom) => {
		const updatedRooms = [...rooms];
		updatedRooms[updatedRoomIndex] = updatedRoom;

		if (updatedRoom.userName === user) {
			// User has booked the room
			onUserBook();
		}

		if (!updatedRoom.userName) {
			// User has unbooked the room
			onUserUnbook();
		}

		setRooms(updatedRooms);
	};

	return rooms.map((room, roomIndex) => {
		return (
			<RoomItem
				room={room}
				roomIndex={roomIndex}
				user={user}
				onRoomUpdate={handleRoomUpdate}
				hasUserBooked={hasUserBooked}
			/>
		);
	});
};
