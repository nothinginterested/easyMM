module.exports = {
  lintOnSave: false,
  publicPath: process.env.NODE_ENV === 'production'
    ? '/easy-MM-website/'
    : '/',
  devServer: {
    hot: true,
    // proxy: {
    //   '/api': {
    //     target: 'http://localhost:3100',
    //     changeOrigin: true
    //   }

    // }
  },
  transpileDependencies: [
    'vue-echarts',
    'resize-detector'
  ]
};
