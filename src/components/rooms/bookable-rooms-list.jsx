import { StyleSheet } from 'aphrodite/no-important';
import { View } from 'wireframe-ui';
import { BookableRoomItem } from './bookable-room-item';

const styles = StyleSheet.create({
	list: {
		width: '100%',
		'@media (orientation: portrait)': {
			flexDirection: 'column',
			flexWrap: 'no-wrap',
			justifyContent: 'flex-start',
			alignSelf: 'stretch',
		},
		'@media (orientation: landscape)': {
			flexDirection: 'row',
			flexWrap: 'wrap',
			maxWidth: 1024,
			justifyContent: 'center',
			alignSelf: 'center',
		},
	},
	item: {
		margin: 'var(--wireframe-spacing-element)',
		'@media (orientation: portrait)': {
			width: 'auto',
			minWidth: 'none',
		},
		'@media (orientation: landscape)': {
			width: `calc(33% - var(--wireframe-spacing-element) * 6)`,
			minWidth: 250,
		},
	},
});

export const BookableRoomsList = ({
	user,
	rooms,
	onTriggerUpdateRoomRequest,
	hasUserBooked,
}) => {
	return (
		<View styleDefinitions={[styles.list]}>
			{rooms.map((room, roomIndex) => {
				return (
					<BookableRoomItem
						key={`${roomIndex}-${room.name}`}
						styleDefinitions={[styles.item]}
						room={room}
						roomIndex={roomIndex}
						user={user}
						hasUserBooked={hasUserBooked}
						onTriggerUpdateRoomRequest={onTriggerUpdateRoomRequest}
					/>
				);
			})}
		</View>
	);
};
