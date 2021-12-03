import { useState } from 'react';
import { StyleSheet } from 'aphrodite/no-important';
import { MdVisibility } from 'react-icons/md';
import { View, TextButton, TextField } from 'wireframe-ui';

const styles = StyleSheet.create({
	reportUserView: {
		flexDirection: 'row',
		alignItems: 'flex-end',
		flexWrap: 'wrap',
		justifyContent: 'center',
	},
	reportUserTextField: {
		margin: 'var(--wireframe-spacing-element)',
	},
	reportUserTextButton: {
		color: 'var(--wireframe-color-light)',
		margin: 'var(--wireframe-spacing-element)',
	},
});

export const ReportUserSection = ({
	size,
	roomIndex,
	onTriggerReportRequest,
	styleDefinitions = [],
	users,
}) => {
	const [reportedUserName, setReportedUserName] = useState('');

	const handleReportedUserName = (event) => {
		setReportedUserName(event.target.value);
	};

	const handleUserReportButtonClick = () => {
		onTriggerReportRequest(reportedUserName, roomIndex);
	};

	return (
		<View styleDefinitions={[styles.reportUserView, ...styleDefinitions]}>
			<TextField
				styleDefinitions={[styles.reportUserTextField]}
				label="Someone in there ?"
				list="users"
				onChange={handleReportedUserName}
				value={reportedUserName}
			/>
			<datalist id="users">
				{users.map((user) => (
					<option value={user.userName} />
				))}
			</datalist>
			<TextButton
				size={size}
				styleDefinitions={[styles.reportUserTextButton]}
				color="DARK"
				AfterIcon={MdVisibility}
				onClick={handleUserReportButtonClick}
			>
				Report
			</TextButton>
		</View>
	);
};
