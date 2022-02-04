import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { LoadingSpinner } from 'wireframe-ui';
import { updateRoomStatus } from '../../core/requests/api';

export const Scan = ({ user }) => {
	const { roomIndex } = new URLSearchParams(window.location.search);

	useEffect(() => {
		if (roomIndex && user) {
			updateRoomStatus({ roomIndex, user })
				.then()
				.catch((error) => {
					toast.error('An error occured');
				});
		}

		window.history.pushState(null, '', '/home');
	}, [roomIndex, user]);

	return <LoadingSpinner size="L" />;
};
