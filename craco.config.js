/* eslint-disable no-undef */
module.exports = {
  typescript: {
    enableTypeChecking: false, // Disable based on the env variable
  },
  webpack: {
    configure: webpackConfig => {
      // Allow importing from parent directories
      webpackConfig.resolve.plugins = webpackConfig.resolve.plugins.filter(
        plugin => plugin.constructor.name !== 'ModuleScopePlugin'
      )

      // Правила для TypeScript файлов
      webpackConfig.module.rules.push({
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-typescript'],
          },
        },
      })

      // Правила для обработки SVG как React-компонентов
      webpackConfig.module.rules.push({
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      })

      webpackConfig.resolve.fallback = {
        ...webpackConfig.resolve.fallback,
        stream: require.resolve('stream-browserify'),
      }

      webpackConfig.resolve.fallback = {
        ...webpackConfig.resolve.fallback,
        http: require.resolve('stream-http'),
      }

      webpackConfig.resolve.fallback = {
        ...webpackConfig.resolve.fallback,
        https: require.resolve('https-browserify'),
      }

      webpackConfig.resolve.fallback = {
        ...webpackConfig.resolve.fallback,
        zlib: require.resolve('browserify-zlib'),
      }

      return webpackConfig
    },
  },
}
