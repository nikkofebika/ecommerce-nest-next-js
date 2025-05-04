const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {
  transformer: {
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  },
  resolver: {
    assetExts: [], // akan ditimpa nanti
    sourceExts: [], // akan ditimpa nanti
  },
};

// merge assetExts dan sourceExts dari default config
const defaultConfig = getDefaultConfig(__dirname);

// buang 'svg' dari assetExts & tambahkan ke sourceExts
config.resolver.assetExts = defaultConfig.resolver.assetExts.filter(ext => ext !== 'svg');
config.resolver.sourceExts = [...defaultConfig.resolver.sourceExts, 'svg'];

module.exports = mergeConfig(defaultConfig, config);
