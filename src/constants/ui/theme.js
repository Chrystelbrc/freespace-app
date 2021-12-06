import { SIZE } from './size';
import { COLORS } from './colors';

const DEFAULT_BORDER_WIDTH = 1;
const DEFAULT_DIMENSION_M = 40;
const DEFAULT_SHADOW_COLOR = 'rgba(0, 0, 0, 0.5)';
const DEFAULT_DARK_COLOR = '#111';
const DEFAULT_LIGHT_COLOR = '#eee';

const DEFAULT_THEME = {
	dimension: {
		[SIZE.S]: 24,
		[SIZE.M]: DEFAULT_DIMENSION_M,
		[SIZE.L]: 64,
	},

	borderWidth: DEFAULT_BORDER_WIDTH,
	borderRadius: DEFAULT_BORDER_WIDTH,

	spacing: {
		element: DEFAULT_BORDER_WIDTH * 2,
		content: DEFAULT_DIMENSION_M,
	},

	fontSize: {
		[SIZE.M]: {
			[SIZE.S]: 12,
			[SIZE.M]: 18,
			[SIZE.L]: 24,
		},
		[SIZE.S]: {
			[SIZE.S]: 10,
			[SIZE.M]: 16,
			[SIZE.L]: 22,
		},
		[SIZE.L]: {
			[SIZE.S]: 14,
			[SIZE.M]: 20,
			[SIZE.L]: 26,
		},
	},

	fontFamily: 'monospace',

	elevation: [
		`0px 0px 0 0px ${DEFAULT_SHADOW_COLOR}`,
		`0px 4px 0 -2px ${DEFAULT_SHADOW_COLOR}`,
		`0px 10px 0 -5px ${DEFAULT_SHADOW_COLOR}`,
		`0px 24px 0 -12px ${DEFAULT_SHADOW_COLOR}`,
		`0px 48px 0 -24px ${DEFAULT_SHADOW_COLOR}`,
	],
};

export const LIGHT_THEME = {
	...DEFAULT_THEME,
	colors: {
		[COLORS.PRIMARY]: '#8888aa',
		[COLORS.TRANSPARENT]: 'rgba(0, 0, 0, 0)',
		[COLORS.DARK]: DEFAULT_DARK_COLOR,
		[COLORS.LIGHT]: DEFAULT_LIGHT_COLOR,
		[COLORS.INFO]: '#0099CC',
		[COLORS.ERROR]: '#CC0000',
		[COLORS.WARNING]: '#CC6600',
		[COLORS.SUCCESS]: '#00CC99',
		[COLORS.TIP]: '#CCCC00',
		[COLORS.DISABLED_BACKGROUND]: '#DDD',
		[COLORS.DISABLED_FOREGROUND]: '#BBB',
		[COLORS.SHADOW]: DEFAULT_SHADOW_COLOR,
		[COLORS.LAYER]: 'rgba(255, 255, 255, 0.75)',
	},
	borderColor: DEFAULT_DARK_COLOR,
	backgroundColor: DEFAULT_LIGHT_COLOR,
	foregroundColor: DEFAULT_DARK_COLOR,
};

export const DARK_THEME = {
	...DEFAULT_THEME,
	colors: {
		[COLORS.PRIMARY]: '#8888aa',
		[COLORS.TRANSPARENT]: 'rgba(0, 0, 0, 0)',
		[COLORS.DARK]: DEFAULT_DARK_COLOR,
		[COLORS.LIGHT]: DEFAULT_LIGHT_COLOR,
		[COLORS.INFO]: '#0099CC',
		[COLORS.ERROR]: '#CC0000',
		[COLORS.WARNING]: '#CC6600',
		[COLORS.SUCCESS]: '#00CC99',
		[COLORS.TIP]: '#CCCC00',
		[COLORS.DISABLED_BACKGROUND]: '#222',
		[COLORS.DISABLED_FOREGROUND]: '#444',
		[COLORS.SHADOW]: DEFAULT_SHADOW_COLOR,
		[COLORS.LAYER]: 'rgba(0, 0, 0, 0.75)',
	},
	borderColor: DEFAULT_LIGHT_COLOR,
	backgroundColor: DEFAULT_DARK_COLOR,
	foregroundColor: DEFAULT_LIGHT_COLOR,
};
