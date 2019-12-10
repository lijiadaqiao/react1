import React from 'react'
import { render } from 'react-dom'
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { Provider } from 'react-redux'
import zhCN from 'antd/es/locale/zh_CN'
import { ConfigProvider } from 'antd'
import App from './App'
import store from './store'
import { mainRouter } from './routes'
import './index.less'
render(
  <Provider store={store}>
    <ConfigProvider locale={zhCN}>
      <Router>
        <Switch>
          <Route path="/admin" render={(routerProps) => {
            //余姚登录才能访问
            return  <App {...routerProps} />
          }} />
          {mainRouter.map(route => {
            return <Route key={route.pathname} path={route.pathname} component={route.component}></Route>
          })}
          <Redirect to='/admin' exact from='/' />
          <Redirect to='/404' />
        </Switch>
      </Router>
    </ConfigProvider>
  </Provider>
  , document.querySelector('#root')
)