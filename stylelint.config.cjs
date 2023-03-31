const bemSelector = () => {
	const ns = '';
	const WORD = '[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*';
	const block = WORD;
	const element = `(?:__${WORD})?`;
	const modifier = `(?:_${WORD}){0,2}`;
	const attribute = '(?:[.+])?';
	return `^.${ns}${block}${element}${modifier}${attribute}$`;
};

// ^.[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*(?:__[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*)?(?:_[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*){0,2}(?:[.+])?$

module.exports = {
	extends: [
		'stylelint-config-rational-order',
		'stylelint-prettier/recommended',
	],
	plugins: [
		'stylelint-order',
		'stylelint-scss',
		'stylelint-config-rational-order/plugin',
	],
	rules: {
		'color-hex-case': 'lower',
		'color-hex-length': 'short',
		'comment-whitespace-inside': 'always',
		'selector-class-pattern': bemSelector(),
		'order/properties-order': [],
		'plugin/rational-order': [
			true,
			{
				'border-in-box-model': false,
				'empty-line-between-groups': true,
			},
		],
		'string-quotes': 'single',
		// 'prettier/prettier': ['error', { printWidth: 120 }],
	},
};
