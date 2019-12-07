
基于react-app-rewired customize-cra 的定制化配置
## 1.yarn add react-app-rewired customize-cra
## 2.然后在项目根目录创建一个 config-overrides.js 用于修改默认配置。
 const {override}=require('customize-cra')
 module.exports = function override()
## 3.package.json
 "scripts": {
-   "start": "react-scripts start",
+   "start": "react-app-rewired start",
-   "build": "react-scripts build",
+   "build": "react-app-rewired build",
-   "test": "react-scripts test",
+   "test": "react-app-rewired test",
}
## 4.yarn add less less-loader  配置less
//config-overrides.js
const {override,addLessLoader}=require('customize-cra')
     module.exports=override(
    addLessLoader({
     javascriptEnabled: true
      })
     )


## 5. yarn add antd babel-plugin-import   使用antd 并启动高级配置
//config-overrides.js
 const {
  override,
  addLessLoader,
 fixBabelImports
} = require('customize-cra')
module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  addLessLoader({
    javascriptEnabled: true
  })
)  

## 6.modifyVars 配置自定义主题
//config-overrides.js
const theme =require('./theme.js')

const {
  override,
  addLessLoader,
  fixBabelImports
} = require('customize-cra')
module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: theme
  })
)   
//theme.js
module.exports = {
 '@primary-color': '#1890ff', // 全局主色
'@link-color': '#1890ff', // 链接色
'@success-color': '#52c41a', // 成功色
'@warning-color': '#faad14', // 警告色
'@error-color': '#f5222d', // 错误色
'@font-size-base': '14px', // 主字号
'@heading-color':'rgba(0, 0, 0, 0.85)',// 标题色
'@text-color': 'rgba(0, 0, 0, 0.65)', // 主文本色
'@text-color-secondary' : 'rgba(0, 0, 0, .45)', // 次文本色
'@disabled-color ': 'rgba(0, 0, 0, .25)', // 失效色
'@border-radius-base': '4px', // 组件/浮层圆角
'@border-color-base':' #d9d9d9', // 边框色
'@box-shadow-base':' 0 2px 8px rgba(0, 0, 0, 0.15)', // 浮层阴影
}

## 7.配置装饰符，装饰高阶组件
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

##  7.1 yarn add -D @babel/plugin-proposal-decorators

## 国际化配置：https://ant.design/docs/react/i18n-cn
