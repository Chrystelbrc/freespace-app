export const isRoomBookableOrUnbookableForCurrentUser = ({
	room,
	user,
	hasUserBooked,
}) => {
	if (hasUserBooked || (room.userName && room.userName !== user)) {
		return false;
	}

	return true;
};
