
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



## 8 路由 yarn add react-router-dom 
## 8.1 路由懒加载 yarn add react-loadable
 https://www.npmjs.com/package/react-loadable

 import Loadable from 'react-loadable';
import Loading from './my-loading-component';
 
const LoadableComponent = Loadable({
  loader: () => import('./my-component'),
  loading: Loading,
});
//LoadableComponent：暴露模块的名字  
./my-component：要导出模块的路径
loader： Loading 未加载完成时显示的自己做的Loading模块



##  接口文档 mock数据
http://rap2.taobao.org/repository/editor?id=239183

## 判断开发者模式
isDev=process.env.NODE_ENV==="development"

## yarn add moment
 moment(createAt).format("YYYY年MM月DD日 HH:mm:ss:")
 moment(createAt).valueOf() 转成时间戳


## xlsx 前端导出excel
npm install xlsx


## processon 画图工具


## bool = document.execCommand(aCommandName, aShowDefaultUI, aValueArgument) 富文本
https://developer.mozilla.org/zh-CN/docs/Web/API/Document/execCommand

# 老版本var mode = document.designMode;
document.designMode = "on" || "off";

https://developer.mozilla.org/zh-CN/docs/Web/API/Document/designMode

别人写好的：  ueditor.baidu.com kindeditor 
wangeditor.com editor.md 后两个推荐

# createRef ref上面不是真正的DOM
createRef().current 获取真正的DOM


eg:wangeditor 
initEditor=()=>{
    this.editor = new E(this.editorRef.current)
    this.editor.customConfig.onchange = (html) => {
      // html 即变化之后的内容     
      this.props.form.setFieldsValue({
        content: html,
      });
  }



# 处理后端传来的数据
 data.createAt=moment(data.createAt)
 this.props.form.setFieldsValue(data)
this.editor.txt.html(data.content)    editor的内容处理方式


# Object.assign
const data =Object.assign({},values,{
          createAt:values.createAt.valueOf()
        })

const returnedTarget = Object.assign(target, source)
target 目标对象。sources 源对象。

# Object.keys(obj)

var obj = { 0: 'a', 1: 'b', 2: 'c' };
console.log(Object.keys(obj)); // console: ['0', '1', '2']

# Object.is() 方法判断两个值是否是相同的值。
Object.is(value1, value2);

https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/prototype


# 使用antd  
  Card, > extra 
  Button,
  Form,   >labelCol wrapperCol 栅格  
    Form.Item > getFieldDecorator  wrapperCol={{span:12,offset:4}}
  Input,
  DatePicker ,
  Spin, >spinning 页面loading
  message  全局提示
  Tag,
  Typography, 排版，里面可放多个span div
  Modal,  >visible onCancel confirmLoading onOk
  Tooltip 经过提示
  Dropdown 下拉菜单
  Badge 小红点
  Dropdown 下拉菜单    style={{display:'flex' ,alignItems:'center'}}



  # table render Function(text, record, index) {}



  #  颜色大全
  https://www.materialui.co/colors


  # 网页图标技术
  1. canvas 
  2.svg 矢量
  3. 三维 webgl

  开源库 图标
  echarts 免费 人最多  yarn add echart
  https://www.echartsjs.com/examples/zh/index.html
  higcharts

  专业开发 图表，数据可视化
  d3
  DataV 阿里的
  egret 做游戏，百度出品
  antv 蚂蚁 G2 G6 F2 L7 很火
  rapheal.js 支持更老的版本


#  react 中操作DOM需要引入createRef 并且在 constructor()
{
    super()
    this.articleAmount=createRef()
  }


#  redux 
yarn add redux react-redux redux-thunk


# list.every
disabled={this.props.list.every(item=>item.hasRead!==true)

# 获取未读数据的数量
notificationsCount:state.notifications.list.filter(item=>item.hasRead===false).length

# css样式技巧
显示在底层：
position: relative;
z-index: 0; 

3d 动画有硬件加速效果
transform:translate3d(-50%,-40%,0);




window.localStorage.setItem('authToken',resp.data.data.authToken)
 window.sessionStorage.setItem('authToken',resp.data.data.authToken)
   window.localStorage.removeItem('authToken')

#  终止ajax请求
如果组件销毁，者不再渲染state
判断ajax 请求是否响应 this.updater.isMounted(this)
  .then(resp=>{
if(!this.updater.isMounted(this)) return

 .finally(()=>{
      if(!this.updater.isMounted(this)) return

#  不使用HashRouter 需要配饰
location / {
  try_files $uri $uri/ /index.html;
}
https://router.vuejs.org/zh/guide/essentials/history-mode.html#%E5%90%8E%E7%AB%AF%E9%85%8D%E7%BD%AE%E4%BE%8B%E5%AD%90
