const theme =require('./theme.js')

const {
  override,
  addLessLoader,
  fixBabelImports,
  addDecoratorsLegacy
} = require('customize-cra')
module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  addDecoratorsLegacy( ),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: theme
  })
)   