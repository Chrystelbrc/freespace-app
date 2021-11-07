import { useState } from 'react';

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
		<>
			<input onChange={handleSetUsername} value={username} />
			<button onClick={handleValidationClick}>test</button>
		</>
	);
};
