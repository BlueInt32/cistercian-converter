// look at https://cli.vuejs.org/config/#global-cli-config for how to customize this

module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: ''
      }
    }
  },
  // outputDir: '../deploy/wwwroot',
  productionSourceMap: false,
  configureWebpack: {
    devtool: 'source-map'
  },
  // publicPath: process.env.NODE_ENV === 'production' ? process.env.VUE_APP_PUBLICPATH : '/'
  publicPath: process.env.VUE_APP_PUBLICPATH
};
