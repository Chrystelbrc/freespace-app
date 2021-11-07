export const isRoomBookableOrUnbookableForCurrentUser = ({
	room,
	user,
	hasUserBooked,
}) => {
	if (room.userName === user) {
		return true;
	}

	if (room.isFree && !hasUserBooked) {
		return true;
	}

	return false;
};
