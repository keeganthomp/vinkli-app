module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // Required for expo-router
      "react-native-reanimated/plugin",
      [
        'module-resolver',
        {
          alias: {
            '@web': './@web',
            '@components': './components',
            '@lib': './lib',
            '@assets': './assets',
            '@context': './context',
            '@theme': './theme',
            '@graphql': './graphql',
            '@utils': './utils',
            '@const': './const',
            '@hooks': './hooks',
            '@types': './types',
          },
        },
      ],
    ],
  };
};
