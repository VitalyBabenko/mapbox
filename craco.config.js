const path = require('path')

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@components/*': path.resolve(__dirname, 'src/components/*'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@store': path.resolve(__dirname, 'src/store'),
      '@hooks/*': path.resolve(__dirname, 'src/hooks/*'),
      '@store/*': path.resolve(__dirname, 'src/store/*'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@constants': path.resolve(__dirname, 'src/constants'),
      '@styles': path.resolve(__dirname, 'src/styles'),
      '@service': path.resolve(__dirname, 'src/service'),
      '@modes': path.resolve(__dirname, 'src/modes'),
      '@panels': path.resolve(__dirname, 'src/panels'),
      '@routes': path.resolve(__dirname, 'src/routes'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@locales': path.resolve(__dirname, 'src/locales'),
      '@utils/*': path.resolve(__dirname, 'src/utils/*'),
      '@constants/*': path.resolve(__dirname, 'src/constants/*'),
      '@styles/*': path.resolve(__dirname, 'src/styles/*'),
      '@service/*': path.resolve(__dirname, 'src/service/*'),
      '@modes/*': path.resolve(__dirname, 'src/modes/*'),
      '@panels/*': path.resolve(__dirname, 'src/panels/*'),
      '@routes/*': path.resolve(__dirname, 'src/routes/*'),
      '@assets/*': path.resolve(__dirname, 'src/assets/*'),
      '@locales/*': path.resolve(__dirname, 'src/locales/*'),
    },
  },
}
