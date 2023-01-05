module.exports = {
  pluginOptions: {
    quasar: {
      importStrategy: 'kebab',
      rtlSupport: false
    },
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: false,
      enableBridge: false
    }
  },
  configureWebpack: {
      devtool: 'source-map'
  },
  transpileDependencies: [
    'quasar'
  ],
  css:{
    extract:false
  }
}
