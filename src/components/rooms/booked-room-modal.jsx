import { useState } from 'react';
import { StyleSheet } from 'aphrodite/no-important';
import { useTimer } from 'react-timer-hook';
import getRandomEmoji from 'get-random-emoji';
import {
	View,
	Text,
	Chip,
	Modal,
	CardImage,
	ModalBar,
	ProgressBar,
} from 'wireframe-ui';
import { MdAnchor } from 'react-icons/md';
import { API_URL } from '../../core/config';
import { UpdateRoomStatusButton } from './update-room-status-button';
import { ReportUserSection } from './report-user-section';

const styles = StyleSheet.create({
	modal: {
		maxWidth: '50vw',
		width: '95vh',
		margin: 'calc(var(--wireframe-spacing-element) * 2)',
		'@media (orientation: portrait)': {
			width: 'calc(95vw - var(--wireframe-spacing-element) * 4)',
			maxWidth: 'none',
		},
	},
	modalContent: {
		padding: 'var(--wireframe-spacing-content)',
		alignItems: 'center',
	},
	modalContentUpdateRoomStatusButton: {
		margin: 'var(--wireframe-spacing-element)',
	},
	modalContentReportUser: {
		marginTop: 'var(--wireframe-spacing-content)',
	},
	modalTimeChip: {
		margin: 'var(--wireframe-spacing-element)',
	},
	cardImage: {
		height: '20vh',
	},
	emojiText: {
		fontSize: 100,
	},
	timeLeftProgressBar: {
		alignSelf: 'stretch',
		margin: 'var(--wireframe-spacing-element)',
	},
});

const formatTime = ({ days, hours, minutes, seconds }) => {
	return `${days ? `${days} days and ` : ''} ${hours
		.toString()
		.padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds
		.toString()
		.padStart(2, '0')}`;
};

export const BookedRoomModal = ({
	bookedRoom,
	bookedRoomIndex,
	user,
	onTriggerUpdateRoomRequest,
	onTriggerReportRequest,
	users,
}) => {
	const [randomEmoji] = useState(getRandomEmoji());

	const bookingMaxDuration = 1000 * 60 * 30;
	const timerStartTimestamp = bookedRoom.lastUpdate;
	const timerEndTimestamp = timerStartTimestamp + bookingMaxDuration;
	const { seconds, minutes, hours, days } = useTimer({
		expiryTimestamp: timerEndTimestamp,
		autoStart: true,
	});
	const progress =
		(bookingMaxDuration - timerEndTimestamp + Date.now()) / bookingMaxDuration;
	return (
		<Modal styleDefinitions={[styles.modal]}>
			<ModalBar
				modalTitle={`You are in ${bookedRoom.name}`}
				ModalTitleIcon={MdAnchor}
			/>
			{bookedRoom.coverFileName && (
				<CardImage
					src={`${API_URL}/covers/${bookedRoom.coverFileName}`}
					styleDefinitions={[styles.cardImage]}
				/>
			)}
			<View styleDefinitions={[styles.modalContent]}>
				<ProgressBar
					size="S"
					color={'SUCCESS'}
					progress={progress}
					styleDefinitions={[styles.timeLeftProgressBar]}
				/>
				<Chip styleDefinitions={[styles.modalTimeChip]} size="L">
					{formatTime({ days, hours, minutes, seconds })}
				</Chip>

				<Text styleDefinitions={[styles.emojiText]}>{randomEmoji}</Text>

				<UpdateRoomStatusButton
					size="L"
					user={user}
					roomIndex={bookedRoomIndex}
					room={bookedRoom}
					onTriggerUpdateRoomRequest={onTriggerUpdateRoomRequest}
					styleDefinitions={[styles.modalContentUpdateRoomStatusButton]}
				/>
				<ReportUserSection
					roomIndex={bookedRoomIndex}
					users={users}
					styleDefinitions={[styles.modalContentReportUser]}
					onTriggerReportRequest={onTriggerReportRequest}
				/>
			</View>
		</Modal>
	);
};
