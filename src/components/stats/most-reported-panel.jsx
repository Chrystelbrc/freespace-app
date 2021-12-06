import { FaSkullCrossbones } from 'react-icons/fa';
import { RankingPanel } from './ranking-panel';

export const MostReportedPanel = ({ users, styleDefinitions }) => {
	const sortedUsers = users.sort(
		(user1, user2) => user2.reported - user1.reported
	);
	return (
		<RankingPanel
			styleDefinitions={styleDefinitions}
			title={'Most reported'}
			TitleIcon={FaSkullCrossbones}
			items={sortedUsers.map(({ userName, reported }) => {
				return {
					label: userName,
					value: reported.toString(),
				};
			})}
		/>
	);
};
