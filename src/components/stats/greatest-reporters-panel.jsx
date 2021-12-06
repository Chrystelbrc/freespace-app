import { MdVisibility } from 'react-icons/md';
import { RankingPanel } from './ranking-panel';

export const GreatestReportersPanel = ({ users, styleDefinitions }) => {
	const sortedUsers = users.sort(
		(user1, user2) => (user2.reporter = user1.reported)
	);
	return (
		<RankingPanel
			styleDefinitions={styleDefinitions}
			title={'Greatest reporters'}
			TitleIcon={MdVisibility}
			items={sortedUsers.map(({ userName, reporter }) => {
				return {
					label: userName,
					value: reporter.toString(),
				};
			})}
		/>
	);
};
