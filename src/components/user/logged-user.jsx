const styles = {
	wrapper: {
		position: 'absolute',
		top: 0,
		right: 0,
		width: 48,
		height: 48,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'column',
		margin: 8,
	},
	avatar: {
		width: 24,
		height: 24,
		borderRadius: 12,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	avatarText: {
		fontSize: 16,
		fontWeight: 'bold',
		textTransform: 'uppercase',
		color: 'white',
	},
	userName: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	userNameText: {
		fontSize: 12,
		overflow: 'hidden',
		whiteSpace: 'nowrap',
		textOverflow: 'ellipsis',
		width: 48,
		textAlign: 'center',
	},
};

const getColorFromString = (string) => {
	let hash = 0;
	for (let i = 0; i < string.length; i++) {
		hash = string.charCodeAt(i) + ((hash << 5) - hash);
	}
	let colour = '#';
	for (let i = 0; i < 3; i++) {
		const value = (hash >> (i * 8)) & 0xff;
		colour += ('00' + value.toString(16)).substr(-2);
	}
	return colour;
};

export const LoggedUser = ({ user, onLogout }) => {
	if (!user) {
		return false;
	}
	const userColor = getColorFromString(user);

	const avatarStyle = {
		...styles.avatar,
		backgroundColor: userColor,
	};

	const userNameTextStyle = {
		...styles.userNameText,
		color: userColor,
	};

	return (
		<div style={styles.wrapper} onClick={onLogout}>
			<div style={avatarStyle}>
				<span style={styles.avatarText}>{user[0]}</span>
			</div>
			<div style={styles.userName}>
				<span style={userNameTextStyle}>{user}</span>
			</div>
		</div>
	);
};
