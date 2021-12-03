import { StyleSheet } from 'aphrodite/no-important';
import { View, Text, Card, CardBar, Chip } from 'wireframe-ui';
import { IoMdTrophy, IoMdMedal, IoMdPodium } from 'react-icons/io';

const styles = StyleSheet.create({
	cardContent: {
		width: '100%',
	},
	rankingItem: {
		flexDirection: 'row',
		alignItems: 'center',
		padding: 'var(--wireframe-spacing-element)',
	},
	rankingItemRankChip: {
		margin: 'var(--wireframe-spacing-element)',
		flexShrink: 0,
	},
	rankingItemRankChipFirst: {
		backgroundColor: '#ffcc33',
		color: 'var(--wireframe-color-dark)',
	},
	rankingItemRankChipSecond: {
		backgroundColor: '#bbbbbb',
		color: 'var(--wireframe-color-dark)',
	},
	rankingItemRankChipThird: {
		backgroundColor: '#ff6633',
		color: 'var(--wireframe-color-dark)',
	},
	rankingItemLabelText: {
		flexGrow: 1,
		margin: 'var(--wireframe-spacing-element)',
		whiteSpace: 'nowrap',
		overflow: 'hidden',
		textOverflow: 'ellipsis',
	},
	rankingItemValueText: {
		flexShrink: 0,
		margin: 'var(--wireframe-spacing-element)',
		textAlign: 'right',
		fontWeight: 'bold',
		whiteSpace: 'nowrap',
		overflow: 'hidden',
		textOverflow: 'ellipsis',
	},
});

const getRankChipStyleDefinitions = (rank) => {
	const styleDefinitions = [styles.rankingItemRankChip];

	if (rank === 1) {
		styleDefinitions.push(styles.rankingItemRankChipFirst);
	}

	if (rank === 2) {
		styleDefinitions.push(styles.rankingItemRankChipSecond);
	}

	if (rank === 3) {
		styleDefinitions.push(styles.rankingItemRankChipThird);
	}

	return styleDefinitions;
};

export const RankingPanel = ({
	items,
	styleDefinitions,
	title,
	TitleIcon = IoMdPodium,
	limit = 5,
	isValueTextSmall,
}) => {
	return (
		<Card styleDefinitions={styleDefinitions}>
			<CardBar
				size="S"
				color="TRANSPARENT"
				CardBarTitleIcon={TitleIcon}
				cardBarTitle={title}
			></CardBar>
			<View styleDefinitions={[styles.cardContent]}>
				{!items?.length && (
					<Text
						size="S"
						// styleDefinitions={[styles.rankingItemLabelText]}
					>
						No ranking yet...
					</Text>
				)}
				{items.slice(0, limit).map(({ label, value }, index) => {
					const rank = index + 1;
					return (
						<View key={label} styleDefinitions={[styles.rankingItem]}>
							<Chip
								size="S"
								color="TRANSPARENT"
								ChipIcon={rank === 1 ? IoMdTrophy : IoMdMedal}
								styleDefinitions={getRankChipStyleDefinitions(rank)}
							>
								{rank}
							</Chip>

							<Text
								size="S"
								small
								styleDefinitions={[styles.rankingItemLabelText]}
							>
								{label}
							</Text>

							{!!value && (
								<Text
									small={isValueTextSmall}
									size="S"
									large
									styleDefinitions={[styles.rankingItemValueText]}
								>
									{value}
								</Text>
							)}
						</View>
					);
				})}
			</View>
		</Card>
	);
};
