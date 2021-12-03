import { StyleSheet } from 'aphrodite/no-important';
import { MdThermostat } from 'react-icons/md';
import { View, Text, ProgressBar, Card, CardBar } from 'wireframe-ui';

const styles = StyleSheet.create({
	label: {
		marginBottom: 2,
	},
	cardContent: {
		padding: 'var(--wireframe-spacing-element)',
	},
});

export const OccupancyRatePanel = ({
	occupancyRate,
	styleDefinitions,
	progressColor,
	progressLabel,
}) => {
	return (
		<Card styleDefinitions={styleDefinitions}>
			<View styleDefinitions={[styles.cardContent]}>
				<Text styleDefinitions={[styles.label]} size="S" small></Text>
				<ProgressBar
					size="S"
					color={progressColor}
					progress={occupancyRate}
					label={progressLabel}
				/>
			</View>

			<CardBar
				size="S"
				color="TRANSPARENT"
				CardBarTitleIcon={MdThermostat}
				cardBarTitle="Occupancy rate"
			></CardBar>
		</Card>
	);
};
