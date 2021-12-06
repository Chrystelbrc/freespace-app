import { useState } from 'react';
import { StyleSheet } from 'aphrodite/no-important';
import {
	TextButton,
	TextField,
	Page,
	Modal,
	ModalBar,
	View,
} from 'wireframe-ui';
import { MdLogin, MdPerson } from 'react-icons/md';

const styles = StyleSheet.create({
	userLoginModal: {
		width: '50vw',
		'@media (max-width: 768px)': {
			width: '80vw',
		},
	},
	userLoginModalContent: {
		padding: 'var(--wireframe-spacing-content)',
	},
	userLoginTextField: { margin: 'var(--wireframe-spacing-element)' },
	userLoginTextButton: {
		alignSelf: 'center',
		margin: 'var(--wireframe-spacing-element)',
	},
});

export const Login = ({ onUserSet }) => {
	const [username, setUsername] = useState('');

	const handleSetUsername = (event) => {
		const { value } = event.target;
		setUsername(value);
	};

	const handleValidationClick = () => {
		onUserSet(username);
	};

	return (
		<Page>
			<Modal styleDefinitions={[styles.userLoginModal]}>
				<ModalBar ModalTitleIcon={MdPerson} modalTitle="Login" />
				<View styleDefinitions={[styles.userLoginModalContent]}>
					<TextField
						styleDefinitions={[styles.userLoginTextField]}
						label="Hello you !"
						onChange={handleSetUsername}
						value={username}
					/>

					<TextButton
						color="SUCCESS"
						styleDefinitions={[styles.userLoginTextButton]}
						AfterIcon={MdLogin}
						onClick={handleValidationClick}
					>
						Ok
					</TextButton>
				</View>
			</Modal>
		</Page>
	);
};
