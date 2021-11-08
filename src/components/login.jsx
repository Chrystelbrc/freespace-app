import { useState } from 'react';
import { Button } from './ui/button';
import './index.css';

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
