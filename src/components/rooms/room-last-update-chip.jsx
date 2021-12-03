import moment from 'moment';
import { Chip } from 'wireframe-ui';
import { MdAccessTime } from 'react-icons/md';

export const RoomLastUpdateChip = ({
	lastUpdate,
	size,
	styleDefinitions,
	color,
}) => {
	if (!lastUpdate) {
		return false;
	}
	return (
		<Chip
			color={color}
			size={size}
			ChipIcon={MdAccessTime}
			styleDefinitions={styleDefinitions}
		>
			{moment(lastUpdate).fromNow()}
		</Chip>
	);
};
