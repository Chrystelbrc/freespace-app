import { StyleSheet } from 'aphrodite/no-important';
import { View, useTheme } from 'wireframe-ui';
import { RoomItem } from './room-item';

const styles = StyleSheet.create({
	list: {
		width: '100%',
		flexDirection: 'row',
		flexWrap: 'wrap',
		maxWidth: 1024,
		justifyContent: 'center',
		alignSelf: 'center',
	},
	item: {
		margin: 'var(--wireframe-spacing-element)',
		'@media (orientation: portrait)': {
			width: `calc(100% - var(--wireframe-spacing-element) * 2)`,
		},
		'@media (orientation: landscape)': {
			width: `calc(33% - var(--wireframe-spacing-element) * 6)`,
		},
	},
});

export const RoomsList = ({ rooms }) => {
	const { isDarkMode } = useTheme();
	return (
		<View styleDefinitions={[styles.list]}>
			{rooms.map((room, roomIndex) => {
				return (
					<RoomItem
						key={`${roomIndex}-${room.name}`}
						styleDefinitions={[styles.item]}
						room={room}
						roomIndex={roomIndex}
						isDark={isDarkMode}
					/>
				);
			})}
		</View>
	);
};
