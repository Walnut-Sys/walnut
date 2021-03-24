module.exports = {
	env: {
		es2021: true,
		node: true,
		jest: true
	},
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:sonarjs/recommended',
		'plugin:prettier/recommended',
		'prettier'
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 12,
		sourceType: 'module'
	},
	plugins: [
		'@typescript-eslint',
		'eslint-plugin-prettier',
		'sonarjs',
		'prettier'
	],
	rules: {
		indent: ['error', 'tab'],
		'prettier/prettier': ['error'],
		'sonarjs/cognitive-complexity': 'error',
		'sonarjs/no-identical-expressions': 'error',
		'@typescript-eslint/naming-convention': [
			'error',
			{
				selector: 'interface',
				format: ['PascalCase'],
				custom: {
					regex: '^I[A-Z]',
					match: false
				}
			},
			{
				selector: ['variable', 'function'],
				format: ['camelCase', 'UPPER_CASE'],
				leadingUnderscore: 'allow'
			}
		]
	}
};
