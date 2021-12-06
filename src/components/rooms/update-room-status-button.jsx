import { MdLock, MdLockOpen } from 'react-icons/md';
import { TextButton } from 'wireframe-ui';
import { isRoomBookableOrUnbookableForCurrentUser } from '../../core/selectors/rooms';

export const UpdateRoomStatusButton = ({
	size,
	user,
	roomIndex,
	room,
	onTriggerUpdateRoomRequest,
	hasUserBooked,
	styleDefinitions,
}) => {
	const { userName: roomUser } = room;

	const isCurrentUserRoomUser = user === roomUser;

	const buttonLabel = isCurrentUserRoomUser ? 'Unbook' : 'Book';
	const buttonColor = isCurrentUserRoomUser ? 'ERROR' : 'SUCCESS';
	const ButtonIcon = isCurrentUserRoomUser ? MdLock : MdLockOpen;

	const isBookOrUnbookTextButtonDisabled =
		!isRoomBookableOrUnbookableForCurrentUser({
			room,
			user,
			hasUserBooked,
		});

	const handleBookButtonClick = () => {
		onTriggerUpdateRoomRequest({ roomIndex, user });
	};

	return (
		<TextButton
			size={size}
			styleDefinitions={styleDefinitions}
			color={buttonColor}
			AfterIcon={ButtonIcon}
			isDisabled={isBookOrUnbookTextButtonDisabled}
			onClick={handleBookButtonClick}
		>
			{buttonLabel}
		</TextButton>
	);
};
