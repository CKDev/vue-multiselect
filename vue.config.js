const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  css: { extract: true },
  configureWebpack: {
    plugins: [
      new UglifyJsPlugin({
        sourceMap: true,
        uglifyOptions: {
          output: {
            comments: false
          }
        }
      })
    ]
  }
}