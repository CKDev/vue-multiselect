const config = {
  babelrc: false,
  presets: ['@babel/preset-env'],
  plugins: [
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    '@babel/plugin-transform-runtime',
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-proposal-object-rest-spread'
  ]
}
module.exports = require('babel-jest').createTransformer(config)
