import moment from 'moment';
import { StyleSheet } from 'aphrodite/no-important';
import { Avatar, Badge, View, Text, Card, CardBar } from 'wireframe-ui';
import { MdPerson, MdCircle } from 'react-icons/md';

const styles = StyleSheet.create({
	cardContent: {
		padding: 'var(--wireframe-spacing-element)',
	},
	userItem: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	userItemAvatarWithBadge: {
		margin: 'var(--wireframe-spacing-element)',
	},
	userItemAvatarBadge: {
		width: 40,
		top: -16,
		right: -24,
	},
	userItemAvatarConnectedBadge: {
		color: 'var(--wireframe-color-success)',
	},
	userItemAvatarDisconnectedBadge: {
		color: 'var(--wireframe-color-disabled-background)',
	},
	userItemUserInformations: {
		flexGrow: 1,
		overflow: 'hidden',
		margin: 'var(--wireframe-spacing-element)',
	},
	userItemUserNameText: {
		whiteSpace: 'nowrap',
		overflow: 'hidden',
		textOverflow: 'ellipsis',
	},
	userItemUserLastDateText: {
		whiteSpace: 'nowrap',
		overflow: 'hidden',
		textOverflow: 'ellipsis',
		lineHeight: '1.2em',
	},
	userItemStatusIcon: {
		margin: 'var(--wireframe-spacing-element)',
		flexShrink: 0,
	},
	reportUserButton: {
		margin: 'var(--wireframe-spacing-element)',
	},
});

const isUserConnected = ({ lastConnection, lastDisconnection }) => {
	if (!lastConnection) {
		return false;
	}
	if (!lastDisconnection) {
		return true;
	}
	return lastConnection > lastDisconnection;
};

export const UsersPanel = ({ currentUserName, users, styleDefinitions }) => {
	return (
		<Card styleDefinitions={styleDefinitions}>
			<CardBar
				size="S"
				color="TRANSPARENT"
				CardBarTitleIcon={MdPerson}
				cardBarTitle={'Users'}
			></CardBar>
			<View styleDefinitions={[styles.cardContent]}>
				{!users.length && (
					<Text size="S" styleDefinitions={[styles.userItemUserNameText]}>
						No user connected yet..
					</Text>
				)}
				{users.map((user) => {
					const isCurrentUserConnected = isUserConnected(user);
					const isCurrentUser = currentUserName === user.userName;
					return (
						<View key={user.userName} styleDefinitions={[styles.userItem]}>
							<Badge
								BadgeIcon={MdCircle}
								color="TRANSPARENT"
								styleDefinitions={[styles.userItemAvatarWithBadge]}
								chipStyleDefinitions={[
									styles.userItemAvatarBadge,
									isCurrentUserConnected
										? styles.userItemAvatarConnectedBadge
										: styles.userItemAvatarDisconnectedBadge,
								]}
							>
								<Avatar userName={user.userName} size="S" />
							</Badge>
							<View styleDefinitions={[styles.userItemUserInformations]}>
								<Text size="S" styleDefinitions={[styles.userItemUserNameText]}>
									{isCurrentUser ? 'Me' : user.userName}
								</Text>
								<Text
									size="S"
									small
									styleDefinitions={[styles.userItemUserLastDateText]}
								>
									{moment(
										isCurrentUserConnected
											? user.lastConnection
											: user.lastDisconnection
									).fromNow()}
								</Text>
							</View>
						</View>
					);
				})}
			</View>
		</Card>
	);
};
