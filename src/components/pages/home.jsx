import { useState, useEffect } from 'react';
import { StyleSheet } from 'aphrodite/no-important';
import { toast } from 'react-toastify';
import { MdQrCode2 } from 'react-icons/md';
import {
	View,
	Overlay,
	LoadingSpinner,
	Page,
	Bar,
	IconButton,
	ThemeSwitch,
} from 'wireframe-ui';
import { updateRoomStatus, reportUser } from '../../core/requests/api';
import { UsersPanel } from '../users/users-panel';
import { BookedRoomModal } from '../rooms/booked-room-modal';
import { BookableRoomsList } from '../rooms/bookable-rooms-list';
import { LoggedUser } from '../user/logged-user';
import { QRCodeScanner } from '../qr-code-scanner';
import { OccupancyRatePanel } from '../stats/occupancy-rate-panel';
import { initializeClientSocket } from '../../core/sockets/initialize-client-socket';

const styles = StyleSheet.create({
	page: {
		paddingTop: 'calc(var(--wireframe-dimension-m) * 2)',
	},
	sections: {
		padding: 'var(--wireframe-spacing-element)',
		flexDirection: 'row',
		'@media (max-width: 768px)': {
			flexDirection: 'column',
		},
	},
	roomsSection: {
		flexGrow: 1,
	},
	usersSection: {
		width: '16.666vw',
		flexShrink: 0,
		alignSelf: 'flex-start',
		margin: 'var(--wireframe-spacing-element)',
		'@media (max-width: 768px)': {
			alignSelf: 'stretch',
			width: 'auto',
		},
	},
	loggedUserBar: {
		flexDirection: 'row',
		height: 'auto',
		justifyContent: 'flex-end',
		padding: 'var(--wireframe-spacing-element)',
		position: 'fixed',
		top: 0,
		left: 0,
		right: 0,
		backgroundColor: 'var(--wireframe-background-color)',
	},
	margined: {
		margin: 'var(--wireframe-spacing-element)',
	},
	loggedUserBarUserSection: {
		flexGrow: 1,
		justifyContent: 'flex-end',
	},
	loadingOverlay: {
		justifyContent: 'center',
	},
	occupancyRatePanel: {
		margin: 'var(--wireframe-spacing-element)',
	},
	scanButton: {
		position: 'fixed',
		bottom: 0,
		right: 0,
		margin: 'calc(var(--wireframe-spacing-element) * 2)',
		borderRadius: 'calc(var(--wireframe-dimension-l) / 2)',
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
			toast.info('Many rooms are free, you can take your time');
			break;
		case OCCUPANCY_LEVEL.HALF_OR_MORE:
			toast.info(
				"Half or more of the rooms have been booked, still okay don't worry"
			);
			break;
		case OCCUPANCY_LEVEL.TWO_THIRD_OR_MORE:
			toast.warning(
				'Only a third of the rooms are available to book, be quick !'
			);
			break;
		case OCCUPANCY_LEVEL.FULL:
			toast.error('All rooms are booked');
			break;
		default:
	}
};

export const Home = ({ user, onUserLogout }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [isQRCodeScannerEnabled, setIsQRCodeScannerEnabled] = useState(false);
	const [hasUserBooked, setHasUserBooked] = useState(false);
	const [rooms, setRooms] = useState([]);
	const [users, setUsers] = useState({});

	const handleOpenQRCodeScanner = () => setIsQRCodeScannerEnabled(true);
	const handleCloseQRCodeScanner = () => setIsQRCodeScannerEnabled(false);

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

	const handleTriggerReportRequest = (reportedUserName, roomIndex) => {
		setIsLoading(true);
		setTimeout(() => {
			reportUser({ reportedUserName, reporterUserName: user, roomIndex })
				.then(() => {
					toast.info(`${reportedUserName} has been reported`);
				})
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

		// Check if current user has already booked
		const hasUserBooked = allRooms.some((room) => {
			return room.userName === user;
		});

		setIsLoading(false);

		if (hasUserBooked) {
			setHasUserBooked(true);
			return;
		}

		setHasUserBooked(false);
	};

	const handleSocketRoomUpdate = (updatedRoom, roomIndex, previousRoomUser) => {
		// Check if event come from current user
		const nextRoomUser = updatedRoom.userName;
		const wasCurrentUserRoom = previousRoomUser === user;
		const willBeCurrentUserRoom = nextRoomUser === user;

		if (!nextRoomUser && !wasCurrentUserRoom) {
			toast.success(`Room ${updatedRoom.name} is free now`);
		}

		if (nextRoomUser && !willBeCurrentUserRoom) {
			toast.warning(
				`Room ${updatedRoom.name} has been booked by ${nextRoomUser}`
			);
		}

		setRooms((previousRooms) => {
			const updatedRooms = [...previousRooms];
			updatedRooms[roomIndex] = updatedRoom;

			return updatedRooms;
		});

		if (willBeCurrentUserRoom) {
			// User has booked the room
			setHasUserBooked(true);
		}

		if (wasCurrentUserRoom) {
			// User has unbooked the room
			setHasUserBooked(false);
		}

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
				user,
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
	}, [user]);

	const bookedRoomNumber = rooms.reduce((accumulator, room) => {
		return accumulator + (room.userName ? 1 : 0);
	}, 0);

	const occupancyRate = bookedRoomNumber / rooms.length;

	const occupancyLevel = getOccupancyLevelFromOccupancyRate(occupancyRate);

	useEffect(() => {
		showToastFromOccupancyLevel(occupancyLevel);
	}, [occupancyLevel]);

	const currentBookedRoomIndex = rooms.findIndex((room) => {
		return room.userName === user;
	});

	const currentBookedRoom =
		(currentBookedRoomIndex || currentBookedRoomIndex === 0) &&
		rooms[currentBookedRoomIndex];

	return (
		<Page styleDefinitions={[styles.page]}>
			<Bar styleDefinitions={[styles.loggedUserBar]}>
				<ThemeSwitch styleDefinitions={[styles.margined]} />
				<LoggedUser
					styleDefinitions={[styles.loggedUserBarUserSection]}
					user={user}
					onLogout={onUserLogout}
				/>
			</Bar>
			<View styleDefinitions={[styles.sections]}>
				<View styleDefinitions={[styles.roomsSection]}>
					<BookableRoomsList
						hasUserBooked={hasUserBooked}
						user={user}
						rooms={rooms}
						onTriggerUpdateRoomRequest={handleTriggerUpdateRoomRequest}
					/>
				</View>
				<View>
					<UsersPanel
						currentUserName={user}
						users={Object.values(users)}
						styleDefinitions={[styles.usersSection]}
					/>
					<OccupancyRatePanel
						occupancyRate={occupancyRate}
						styleDefinitions={[styles.occupancyRatePanel]}
						progressColor={getProgressBarColorFromOccupancyLevel(
							occupancyLevel
						)}
						progressLabel={`${bookedRoomNumber}/${rooms.length}`}
					/>
				</View>
			</View>
			{!!currentBookedRoom && (
				<BookedRoomModal
					bookedRoom={currentBookedRoom}
					bookedRoomIndex={currentBookedRoomIndex}
					user={user}
					users={Object.values(users)}
					onTriggerUpdateRoomRequest={handleTriggerUpdateRoomRequest}
					onTriggerReportRequest={handleTriggerReportRequest}
				/>
			)}
			{isLoading && (
				<Overlay styleDefinitions={[styles.loadingOverlay]}>
					<LoadingSpinner size="L" />
				</Overlay>
			)}
			{!isQRCodeScannerEnabled && !hasUserBooked && (
				<IconButton
					size="L"
					styleDefinitions={[styles.scanButton]}
					onClick={handleOpenQRCodeScanner}
					ButtonIcon={MdQrCode2}
					color="INFO"
				>
					Scan and book
				</IconButton>
			)}
			{isQRCodeScannerEnabled && (
				<QRCodeScanner user={user} onClose={handleCloseQRCodeScanner} />
			)}
		</Page>
	);
};
