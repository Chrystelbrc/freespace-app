import { useState, useEffect } from 'react';
import { RoomItem } from './room-item';

export const RoomsList = ({ user }) => {
  const [rooms, setRooms] = useState([]);

  const [hasCurrentUserAlreadyBooked, setHasCurrentUserAlreadyBooked] =
    useState(false);

  useEffect(() => {
    fetch('http://localhost:3001/fetch-all-rooms')
      .then((response) => {
        return response.json();
      })
      .then((rooms) => {
        setRooms(rooms);
        setHasCurrentUserAlreadyBooked(
          rooms.some((room) => {
            return room.userName === user;
          })
        );
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
      setHasCurrentUserAlreadyBooked(true);
    }

    if (!updatedRoom.userName) {
      // User has unbooked the room
      setHasCurrentUserAlreadyBooked(false);
    }

    setRooms(updatedRooms);
  };

  return rooms.map(({ name, isFree, userName }, roomIndex) => {
    return (
      <RoomItem
        roomIndex={roomIndex}
        name={name}
        isFree={isFree}
        roomUser={userName}
        user={user}
        onRoomUpdate={handleRoomUpdate}
        hasCurrentUserAlreadyBooked={hasCurrentUserAlreadyBooked}
      />
    );
  });
};
