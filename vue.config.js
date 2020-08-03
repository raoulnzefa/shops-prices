module.exports = {
  chainWebpack: config => {
  
  const fontsRule = config.module.rule('fonts')
  fontsRule.uses.clear()
  
  config.module
    .rule('fonts')
    .test(/\.(ttf|otf|eot|woff|woff2)$/)
    .use('file-loader')
    .loader('file-loader')
    .tap(options => {
      options = {
        name: 'fonts/[name].[hash:8].[ext]'
      }
      return options
     })
    .end()
  }
}
