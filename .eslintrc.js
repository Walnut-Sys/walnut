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
		'prettier'
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 12,
		sourceType: 'module'
	},
	plugins: ['@typescript-eslint', 'sonarjs'],
	rules: {
		indent: ['error', 'tab'],
		'sonarjs/cognitive-complexity': 'error',
		'sonarjs/no-identical-expressions': 'error',
		'@typescript-eslint/naming-convention': [
			'error',
			{
				selector: 'interface',
				format: ['PascalCase']
			},
			{
				selector: ['variable', 'function'],
				format: ['camelCase', 'UPPER_CASE'],
				leadingUnderscore: 'allow'
			}
		]
	}
};
