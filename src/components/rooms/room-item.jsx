import { StyleSheet } from 'aphrodite/no-important';
import { MdBlock, MdCheck } from 'react-icons/md';
import { Card, CardBar, CardImage, View, Text, Avatar } from 'wireframe-ui';
import { RoomLastUpdateChip } from './room-last-update-chip';
import { API_URL } from '../../core/config';

const styles = StyleSheet.create({
	content: {
		flexGrow: 1,
		padding: 'var(--wireframe-spacing-element)',
	},
	currentRoomUser: {
		height: 200,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 'var(--wireframe-spacing-element)',
	},
	avatar: {
		margin: 'var(--wireframe-spacing-element)',
	},
	userName: {
		margin: 'var(--wireframe-spacing-element)',
		overfllow: 'hidden',
	},
	userNameText: {
		overflow: 'hidden',
		whiteSpace: 'no-wrap',
		textOverflow: 'ellipsis',
	},
	lastUpdateChip: {
		margin: 'var(--wireframe-spacing-element)',
	},
	bookOrUnbook: {
		flexGrow: 1,
		justifyContent: 'flex-end',
		alignItems: 'flex-end',
	},
	bookOrUnbookTextButton: {
		margin: 'var(--wireframe-spacing-element)',
	},
	cardImage: {
		height: 200,
		objectFit: 'contain',
	},
	disabledCardBar: {
		color: 'var(--wireframe-color-disabled-foreground)',
	},
});

export const RoomItem = ({ room, roomIndex, styleDefinitions, isDark }) => {
	const { userName: roomUser, name, lastUpdate } = room;

	const TitleIcon = roomUser ? MdBlock : MdCheck;

	return (
		// <Badge
		// 	BadgeIcon={roomUser ? MdClose : MdCheck}
		// 	color={roomUser ? 'DISABLED_BACKGROUND' : 'SUCCESS'}
		// 	size="S"
		// 	badgeContent={roomUser ? 'Unavailable' : 'Available'}
		// 	styleDefinitions={styleDefinitions}
		// >
		<Card elevation={1} styleDefinitions={styleDefinitions}>
			{!roomUser && (
				<CardImage
					src={`${API_URL}/qr-code/${roomIndex}.png?size=200&margin=0&isDark=${isDark}`}
					styleDefinitions={[styles.cardImage]}
				/>
			)}
			{!!roomUser && (
				<View styleDefinitions={[styles.currentRoomUser]}>
					<Avatar
						size="L"
						userName={roomUser}
						styleDefinitions={[styles.avatar]}
					/>

					<View styleDefinitions={[styles.userName]}>
						<Text styleDefinitions={[styles.userNameText]}>{roomUser}</Text>
					</View>
					<RoomLastUpdateChip
						lastUpdate={lastUpdate}
						size="S"
						styleDefinitions={[styles.lastUpdateChip]}
					/>
				</View>
			)}
			<CardBar
				cardBarTitle={name}
				CardBarTitleIcon={TitleIcon}
				color={roomUser ? 'DISABLED_BACKGROUND' : 'PRIMARY'}
				styleDefinitions={[!!roomUser && styles.disabledCardBar]}
			/>
		</Card>
	);
};
