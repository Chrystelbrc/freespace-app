import { useState, useEffect } from 'react';
import { StyleSheet } from 'aphrodite/no-important';
import { toast } from 'react-toastify';
import { initializeClientSocket } from '../../core/sockets/initialize-client-socket';
import { View, Overlay, LoadingSpinner, Page } from 'wireframe-ui';
import { updateRoomStatus } from '../../core/requests/api';
import { UsersPanel } from '../users/users-panel';
import { RoomsList } from '../rooms/rooms-list';
import { OccupancyRatePanel } from '../stats/occupancy-rate-panel';
import { MostReportedPanel } from '../stats/most-reported-panel';
import { GreatestReportersPanel } from '../stats/greatest-reporters-panel';
import { LongestBookingDurationUsersPanel } from '../stats/longest-booking-duration-users-panel';
import { MostUsedRoomsPanel } from '../stats/most-used-rooms-panel';

const styles = StyleSheet.create({
	sections: {
		padding: 'var(--wireframe-spacing-element)',
		flexDirection: 'row',
		'@media (max-width: 768px)': {
			flexWrap: 'wrap',
		},
	},
	roomsSection: {
		flexGrow: 1,
	},
	usersSection: {
		// alignItems: 'flex-end',
		justifyContent: 'flex-start',
	},
	loadingOverlay: {
		justifyContent: 'center',
	},
	panel: {
		margin: 'var(--wireframe-spacing-element)',
		width: 200,
	},
});

const OCCUPANCY_LEVEL = {
	EMPTY: 0,
	HALF_OR_LESS: 1,
	HALF_OR_MORE: 2,
	TWO_THIRD_OR_MORE: 3,
	FULL: 4,
};

const getOccupancyLevelFromOccupancyRate = (occupancyRate) => {
	if (occupancyRate === 0) {
		return OCCUPANCY_LEVEL.EMPTY;
	}

	if (occupancyRate > 0 && occupancyRate < 0.5) {
		return OCCUPANCY_LEVEL.HALF_OR_LESS;
	}

	if (occupancyRate >= 0.5 && occupancyRate < 0.66) {
		return OCCUPANCY_LEVEL.HALF_OR_MORE;
	}

	if (occupancyRate >= 0.66 && occupancyRate < 1) {
		return OCCUPANCY_LEVEL.TWO_THIRD_OR_MORE;
	}

	if (occupancyRate === 1) {
		return OCCUPANCY_LEVEL.FULL;
	}
};

const getProgressBarColorFromOccupancyLevel = (occupancyLevel) => {
	switch (occupancyLevel) {
		case OCCUPANCY_LEVEL.EMPTY:
			return 'SUCCESS';
		case OCCUPANCY_LEVEL.HALF_OR_LESS:
			return 'SUCCESS';
		case OCCUPANCY_LEVEL.HALF_OR_MORE:
			return 'INFO';
		case OCCUPANCY_LEVEL.TWO_THIRD_OR_MORE:
			return 'WARNING';
		case OCCUPANCY_LEVEL.FULL:
			return 'ERROR';
		default:
	}
};

const showToastFromOccupancyLevel = (occupancyLevel) => {
	switch (occupancyLevel) {
		case OCCUPANCY_LEVEL.EMPTY:
			toast.success('All rooms are free');
			break;
		case OCCUPANCY_LEVEL.HALF_OR_LESS:
			toast.info('Many rooms are free');
			break;
		case OCCUPANCY_LEVEL.HALF_OR_MORE:
			toast.info('Half or more of the rooms have been booked');
			break;
		case OCCUPANCY_LEVEL.TWO_THIRD_OR_MORE:
			toast.warning('Only a third of the rooms are available to book');
			break;
		case OCCUPANCY_LEVEL.FULL:
			toast.error('All rooms are booked');
			break;
		default:
	}
};

export const Board = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [rooms, setRooms] = useState([]);
	const [users, setUsers] = useState({});

	const handleTriggerUpdateRoomRequest = ({ roomIndex, user }) => {
		setIsLoading(true);
		setTimeout(() => {
			updateRoomStatus({ roomIndex, user })
				.then()
				.catch((error) => {
					setIsLoading(false);
					toast.error('An error occured');
				});
		}, 1000);
	};

	const handleSocketConnect = () => {
		setIsLoading(true);
	};

	const handleSocketGetAllRooms = (allRooms) => {
		setRooms(allRooms);

		setIsLoading(false);
	};

	const handleSocketRoomUpdate = (updatedRoom, roomIndex, previousRoomUser) => {
		// Check if event come from current user
		const nextRoomUser = updatedRoom.userName;

		if (!nextRoomUser) {
			toast.success(`Room ${updatedRoom.name} is free now`);
		}

		if (nextRoomUser) {
			toast.warning(
				`Room ${updatedRoom.name} has been booked by ${nextRoomUser}`
			);
		}

		setRooms((previousRooms) => {
			const updatedRooms = [...previousRooms];
			updatedRooms[roomIndex] = updatedRoom;

			return updatedRooms;
		});

		setIsLoading(false);
	};

	const handleSocketGetAllUsers = (allUsersByUserName) => {
		setUsers(allUsersByUserName);
	};

	const handleSocketUserUpdate = (...updatedUsers) => {
		setUsers((allUsers) => {
			return updatedUsers?.reduce(
				(accumulator, updatedUser) => {
					accumulator[updatedUser.userName] = updatedUser;
					return accumulator;
				},
				{ ...allUsers }
			);
		});
	};

	useEffect(() => {
		const socket = initializeClientSocket({
			connectionQuery: {
				isBoard: true,
			},
			onConnect: handleSocketConnect,
			onGetAllRooms: handleSocketGetAllRooms,
			onRoomUpdate: handleSocketRoomUpdate,
			onGetAllUsers: handleSocketGetAllUsers,
			onUserUpdate: handleSocketUserUpdate,
		});

		return () => {
			socket.disconnect();
		};
	}, []);

	const bookedRoomNumber = rooms.reduce((accumulator, room) => {
		return accumulator + (room.userName ? 1 : 0);
	}, 0);

	const occupancyRate = bookedRoomNumber / rooms.length;

	const occupancyLevel = getOccupancyLevelFromOccupancyRate(occupancyRate);

	useEffect(() => {
		showToastFromOccupancyLevel(occupancyLevel);
	}, [occupancyLevel]);

	const usersList = Object.values(users);
	return (
		<Page>
			<View styleDefinitions={[styles.sections]}>
				<View styleDefinitions={[styles.roomsSection]}>
					<RoomsList
						rooms={rooms}
						onTriggerUpdateRoomRequest={handleTriggerUpdateRoomRequest}
					/>
				</View>
				<View styleDefinitions={[styles.usersSection]}>
					<OccupancyRatePanel
						occupancyRate={occupancyRate}
						styleDefinitions={[styles.panel]}
						progressColor={getProgressBarColorFromOccupancyLevel(
							occupancyLevel
						)}
						progressLabel={`${bookedRoomNumber}/${rooms.length}`}
					/>
					<UsersPanel users={usersList} styleDefinitions={[styles.panel]} />
				</View>
				<View styleDefinitions={[styles.usersSection]}>
					<MostReportedPanel
						styleDefinitions={[styles.panel]}
						users={usersList}
					/>
					<GreatestReportersPanel
						styleDefinitions={[styles.panel]}
						users={usersList}
					/>
					<LongestBookingDurationUsersPanel
						styleDefinitions={[styles.panel]}
						users={usersList}
					/>
					<MostUsedRoomsPanel
						styleDefinitions={[styles.panel]}
						users={usersList}
						rooms={rooms}
					/>
				</View>
			</View>
			{isLoading && (
				<Overlay styleDefinitions={[styles.loadingOverlay]}>
					<LoadingSpinner size="L" />
				</Overlay>
			)}
		</Page>
	);
};
