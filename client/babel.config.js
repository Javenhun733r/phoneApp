module.exports = function (api) {
	api.cache(true)
	return {
		presets: [
			[
				'babel-preset-expo',
				{
					rootPathSuffix: './app',
					rootPathPrefix: '@/',
					jsxImportSource: 'nativewind'
				}
			]
		],

		plugins: [['inline-dotenv'], ['react-native-reanimated/plugin']]
	}
}
