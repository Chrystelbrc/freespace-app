import { MdClose } from 'react-icons/md';
import { StyleSheet } from 'aphrodite/no-important';
import { Avatar, Text, View, IconButton } from 'wireframe-ui';

const styles = StyleSheet.create({
	wrapper: {
		flexDirection: 'row',
	},
	userName: {
		alignItems: 'center',
		justifyContent: 'center',
		height: 'var(--wireframe-dimension-m)',
		margin: 'var(--wireframe-spacing-element)',
	},
	userNameText: {
		fontSize: 'var(--wireframe-font-size-s-m)',
		overflow: 'hidden',
		whiteSpace: 'nowrap',
		textOverflow: 'ellipsis',
		maxWidth: 'calc(var(--wireframe-dimension-m) * 3)',
		textAlign: 'center',
		fontWeight: 'bold',
	},
	userAvatar: { margin: 'var(--wireframe-spacing-element)' },
	lougoutTextButton: {
		margin: 'var(--wireframe-spacing-element)',
		color: 'var(--wireframe-foreground-color)',
	},
});

export const LoggedUser = ({ user, onLogout, styleDefinitions = [] }) => {
	if (!user) {
		return false;
	}

	return (
		<View styleDefinitions={[styles.wrapper, ...styleDefinitions]}>
			<Avatar userName={user} styleDefinitions={[styles.userAvatar]} />

			<View styleDefinitions={[styles.userName]}>
				<Text styleDefinitions={[styles.userNameText]}>{user}</Text>
			</View>

			<IconButton
				styleDefinitions={[styles.lougoutTextButton]}
				onClick={onLogout}
				ButtonIcon={MdClose}
				variant="text"
			/>
		</View>
	);
};
