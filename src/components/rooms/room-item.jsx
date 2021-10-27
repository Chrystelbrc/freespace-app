const isButtonDisabled = ({
  hasCurrentUserAlreadyBooked,
  isCurrentRoomFree,
  isCurrentRoomBookedByCurrentUser,
}) => {
  if(isCurrentRoomBookedByCurrentUser) {
    return false;
  }

  if(!isCurrentRoomFree) {
    return true;
  }

  if(hasCurrentUserAlreadyBooked) {
    return true;
  }

  return false;

}

export const RoomItem = ({
  name,
  isFree,
  roomUser,
  roomIndex,
  user,
  onRoomUpdate,
  hasCurrentUserAlreadyBooked,
}) => {
  const handleBookButtonClick = () => {
    fetch(`http://localhost:3001/update-room-status/${roomIndex}/${user}`, {
      method: 'PUT',
    })
      .then((response) => {
        return response.json();
      })
      .then((updatedRoom) => {
        console.log(updatedRoom);
        onRoomUpdate(roomIndex, updatedRoom);
      });
  };
  const isCurrentRoomBookedByCurrentUser = user === roomUser;

  return (
    <div>
      {name}
      <button
        disabled={isButtonDisabled({
          isCurrentRoomBookedByCurrentUser,
          hasCurrentUserAlreadyBooked,
          isCurrentRoomFree: isFree
        })}
        onClick={handleBookButtonClick}
      >
        {isCurrentRoomBookedByCurrentUser ? 'Unbook' : 'Book'}
      </button>
    </div>
  );
};
