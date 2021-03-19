module.exports = {
	env: {
		es2021: true,
		node: true,
		jest: true
	},
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'prettier'
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 12,
		sourceType: 'module'
	},
	plugins: ['@typescript-eslint'],
	rules: {
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
