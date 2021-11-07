import { updateRoomStatus } from '../../core/requests/api';
import { isRoomBookableOrUnbookableForCurrentUser } from '../../core/selectors/rooms';

export const RoomItem = ({
	room,
	roomIndex,
	user,
	onRoomUpdate,
	hasUserBooked,
}) => {
	const { userName: roomUser, name } = room;
	const handleBookButtonClick = () => {
		updateRoomStatus({ roomIndex, user }).then((updatedRoom) => {
			onRoomUpdate(roomIndex, updatedRoom);
		});
	};

	const buttonLabel = user === roomUser ? 'Unbook' : 'Book';

	return (
		<div>
			{name}
			<button
				disabled={
					!isRoomBookableOrUnbookableForCurrentUser({
						room,
						user,
						hasUserBooked,
					})
				}
				onClick={handleBookButtonClick}
			>
				{buttonLabel}
			</button>
		</div>
	);
};
