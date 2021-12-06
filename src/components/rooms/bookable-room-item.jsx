import { StyleSheet } from 'aphrodite/no-important';
import { MdHome, MdOutlineHome, MdClose, MdCheck } from 'react-icons/md';
import {
	Card,
	CardBar,
	CardContent,
	CardImage,
	View,
	Text,
	Avatar,
	Badge,
} from 'wireframe-ui';
import { UpdateRoomStatusButton } from './update-room-status-button';
import { RoomLastUpdateChip } from './room-last-update-chip';
import { API_URL } from '../../core/config';

const styles = StyleSheet.create({
	content: {
		flexGrow: 1,
		padding: 'var(--wireframe-spacing-element)',
	},
	currentRoomUser: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	avatar: {
		margin: 'var(--wireframe-spacing-element)',
		flexShrink: 0,
	},
	userName: {
		margin: 'var(--wireframe-spacing-element)',
		flexGrow: 1,
		overflow: 'hidden',
	},
	userNameText: {
		overflow: 'hidden',
		whiteSpace: 'no-wrap',
		textOverflow: 'ellipsis',
	},
	lastUpdateChip: {
		margin: 'var(--wireframe-spacing-element)',
		alignSelf: 'flex-start',
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
		height: 100,
	},
	disabledCardBar: {
		color: 'var(--wireframe-color-disabled-foreground)',
	},
});

export const BookableRoomItem = ({
	room,
	roomIndex,
	user,
	hasUserBooked,
	styleDefinitions,
	onTriggerUpdateRoomRequest,
}) => {
	const { userName: roomUser, name, lastUpdate } = room;

	const isCurrentUserRoomUser = user === roomUser;

	const TitleIcon = roomUser ? MdHome : MdOutlineHome;
	const userName = isCurrentUserRoomUser ? 'Me' : roomUser;

	return (
		<Badge
			BadgeIcon={roomUser ? MdClose : MdCheck}
			color={roomUser ? 'DISABLED_BACKGROUND' : 'SUCCESS'}
			size="S"
			badgeContent={roomUser ? 'Unavailable' : 'Available'}
			styleDefinitions={styleDefinitions}
		>
			<Card elevation={1}>
				{room.coverFileName && (
					<CardImage
						src={`${API_URL}/covers/${room.coverFileName}`}
						styleDefinitions={[styles.cardImage]}
					/>
				)}
				<CardBar
					cardBarTitle={name}
					CardBarTitleIcon={TitleIcon}
					color={roomUser ? 'DISABLED_BACKGROUND' : 'PRIMARY'}
					styleDefinitions={[!!roomUser && styles.disabledCardBar]}
				/>
				<CardContent styleDefinitions={[styles.content]}>
					<View styleDefinitions={[styles.currentRoomUser]}>
						<Avatar
							userName={roomUser || '?'}
							styleDefinitions={[styles.avatar]}
							avatarViewBackgroundColor={!roomUser && 'transparent'}
						/>

						<View styleDefinitions={[styles.userName]}>
							<Text styleDefinitions={[styles.userNameText]}>{userName}</Text>
						</View>
					</View>

					<RoomLastUpdateChip
						lastUpdate={lastUpdate}
						size="S"
						styleDefinitions={[styles.lastUpdateChip]}
					/>

					<View styleDefinitions={[styles.bookOrUnbook]}>
						<UpdateRoomStatusButton
							user={user}
							roomIndex={roomIndex}
							room={room}
							onTriggerUpdateRoomRequest={onTriggerUpdateRoomRequest}
							hasUserBooked={hasUserBooked}
							styleDefinitions={[styles.bookOrUnbookTextButton]}
						/>
					</View>
				</CardContent>
			</Card>
		</Badge>
	);
};
