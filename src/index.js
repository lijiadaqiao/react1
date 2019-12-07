import React from 'react'
import {render} from 'react-dom'
import {HashRouter as Router,Route,Switch,Redirect}from 'react-router-dom'
import App from './App'
import {mainRouter}from './routes'
import './index.less'
render(
  <Router>
    <Switch>
      <Route path="/admin" render={(routerProps)=>{
        //余姚登录才能访问
        return <App {...routerProps}/>
      }}/>
      {mainRouter.map(route=>{
        return <Route key={route.pathname} path={route.pathname} component={route.component}></Route>
      })}
      <Redirect to='/admin' exact from='/' />
      <Redirect to='/404'/>
    </Switch>
  </Router>
  ,document.querySelector('#root')
)