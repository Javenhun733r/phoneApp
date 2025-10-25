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
		plugins: ['react-native-reanimated/plugin']
	}
}
