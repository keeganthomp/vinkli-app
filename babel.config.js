module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // Required for expo-router
      'expo-router/babel',
      "react-native-reanimated/plugin",
      [
        'module-resolver',
        {
          alias: {
            '@components': './components',
            '@lib': './lib',
            '@assets': './assets',
            '@context': './context',
            '@theme': './theme',
            '@graphql': './graphql',
            '@utils': './utils',
            '@const': './const',
            '@hooks': './hooks',
          },
        },
      ],
    ],
  };
};
