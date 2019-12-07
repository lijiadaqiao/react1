import React, { Component } from 'react'

import {Button}from 'antd'


const testHOC=(wrapComponent)=>{
  return class HOCComponent extends Component{
    render(){
      return (
        <>
        <wrapComponent></wrapComponent>
        <div>这是高阶组件1</div>
        </>
      )
    }
  }
}
@testHOC

 class App extends Component {
  render() {
    return (
      <div>
       <Button>1234</Button>
        
      </div>
    )
  }
}
export default App