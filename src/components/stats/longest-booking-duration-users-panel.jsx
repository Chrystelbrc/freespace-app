import moment from 'moment';
import { MdAccessTime } from 'react-icons/md';
import { RankingPanel } from './ranking-panel';

const getUserTotalRoomTime = ({ bookings }) => {
	return bookings.reduce((accumulator, { start, end }) => {
		return accumulator + ((end || Date.now()) - start);
	}, 0);
};
export const LongestBookingDurationUsersPanel = ({
	users,
	styleDefinitions,
}) => {
	const sortedUsers = users
		.map((user) => {
			const userBookingDuration = getUserTotalRoomTime(user);
			return {
				user,
				userBookingDuration,
			};
		})
		.sort((user1, user2) => {
			if (user1.userBookingDuration === user2.userBookingDuration) {
				return 0;
			}
			if (user1.userBookingDuration > user2.userBookingDuration) {
				return -1;
			}
			return 1;
		})
		.map(({ user, userBookingDuration }) => {
			return {
				label: user.userName,
				value: moment.duration(userBookingDuration).humanize(),
			};
		});
	return (
		<RankingPanel
			isValueTextSmall
			styleDefinitions={styleDefinitions}
			TitleIcon={MdAccessTime}
			title={'Longest booking duration users'}
			items={sortedUsers}
		/>
	);
};
