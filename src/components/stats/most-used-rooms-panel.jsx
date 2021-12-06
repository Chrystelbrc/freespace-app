import moment from 'moment';
import { MdStar } from 'react-icons/md';
import { RankingPanel } from './ranking-panel';

const getRoomsBookingDurationByRoomIndexFromUsers = (users) => {
	return users.reduce((accumulator, { bookings }) => {
		return bookings.reduce(
			(bookingsAccumulator, { start, end = Date.now(), roomIndex }) => {
				const currentRoomBookingDuration = end - start;

				bookingsAccumulator[roomIndex] = bookingsAccumulator[roomIndex]
					? bookingsAccumulator[roomIndex] + currentRoomBookingDuration
					: currentRoomBookingDuration;

				return bookingsAccumulator;
			},
			accumulator
		);
	}, {});
};

export const MostUsedRoomsPanel = ({ users, rooms, styleDefinitions }) => {
	const roomsBookingDurationByRoomIndex =
		getRoomsBookingDurationByRoomIndexFromUsers(users);

	const sortedRooms = rooms
		.map((room, roomIndex) => {
			return {
				...room,
				bookingDuration: roomsBookingDurationByRoomIndex[roomIndex] || 0,
			};
		})
		.sort((room1, room2) => room2.bookingDuration - room1.bookingDuration);

	return (
		<RankingPanel
			isValueTextSmall
			styleDefinitions={styleDefinitions}
			title={'Most used rooms'}
			TitleIcon={MdStar}
			items={sortedRooms.map(({ name, bookingDuration }) => {
				return {
					label: name,
					value: moment.duration(bookingDuration).humanize(),
				};
			})}
		/>
	);
};
