const path = require('path');
const withSass = require('@zeit/next-sass')
const withCSS = require('@zeit/next-css')

module.exports = withCSS(withSass({
	cssModules: true,
	sassOptions: {
		includePaths: [path.resolve(__dirname, "styles")]
	},
	webpack: (config, {defaultLoaders}) => {
		config.module.rules.push({
			test: /\.(js|jsx)$/,
			include: [path.resolve(__dirname, 'components')],
			use: [defaultLoaders.babel],
		})

		// config.resolve.alias['react'] = path.resolve(__dirname, '.', 'node_modules', 'react');
		config.resolve.alias['components'] = path.resolve(__dirname, 'components');
		// config.resolve.alias['styles'] = path.resolve(__dirname, 'styles');
		return config;
	}
}))
