import React, { Component } from 'react'
import { Layout, Menu,  Icon, Dropdown ,Avatar,Badge} from 'antd'
import {withRouter} from 'react-router-dom'
import {connect}from 'react-redux'
import {getNotificationlist}from '../../actions/notifications'
import{logout}from '../../actions/user'
import logo from './logo.jpg'
import './frame.less'
const { Header, Content,  Sider } = Layout


const mapState=state=>{
  return {
    notificationsCount:state.notifications.list.filter(item=>item.hasRead===false).length,
    avatar:state.user.avatar,
    displayName:state.user.displayName
  }
}

@connect(mapState,{getNotificationlist,logout})
@withRouter
class Frame extends Component {
  componentDidMount(){
    this.props.getNotificationlist()
    
  }
  onMenuClick=({ key })=>{
    this.props.history.push(key)
  }
  onDropdownMenuClick=({key})=>{
    if(key==='/login'){
      this.props.logout()
    }else{
      this.props.history.push(key)
    }
   
  }
   renderDropdown=() => (
    <Menu onClick={this.onDropdownMenuClick}>
      <Menu.Item key="/admin/notifications">
      <Badge dot={Boolean(this.props.notificationsCount)}>
      
          通知中心
        
      </Badge>
        
      </Menu.Item>
      <Menu.Item key="/admin/profile">
       
          个人设置
       
      </Menu.Item>
      <Menu.Item key="/login">
       
         退出登录
      
      </Menu.Item>
    </Menu>
  );
  render() {
    
    const selectedKeyArr=this.props.location.pathname.split('/')
    selectedKeyArr.length=3
   
    return (
      <Layout style={{height:'100%'}}>
    <Header className=" qf-header header " style={{backgroundColor:'fff'}}>
      <div className="qf-logo" >
        
        <img src={logo}  alt="QFADMIN" />
        
      </div>
     <div>
     <Dropdown overlay={this.renderDropdown()} trigger={['click']}>
     
    <div style={{display:'flex' ,alignItems:'center'}} >
      <Avatar src={this.props.avatar} />
      欢迎您 !{this.props.displayName}
      <Badge count={this.props.notificationsCount} offset={[-10,-10]}>
      <Icon type="down" /> </Badge>
    </div>
   
  </Dropdown>
     </div>
    </Header>
    <Layout>
      <Sider width={200} style={{ background: '#fff' }}>
        <Menu
          mode="inline"
          selectedKeys={[selectedKeyArr.join('/')]}
          onClick={this.onMenuClick}
          style={{ height: '100%', borderRight: 0 }}
        >
          {
            this.props.menus.map(item=>{
              return (
                <Menu.Item  key={item.pathname}>
                  <Icon type={item.icon} />
                   {item.title}</Menu.Item>
              )
            })
          }
          
          
        </Menu>
      </Sider>
      <Layout style={{ padding: '16px' }}>
      
        <Content
          style={{
            background: '#fff',
           
            margin: 0,
           
          }}
        >
          {this.props.children}
        </Content>
      </Layout>
    </Layout>
  </Layout>
    )
  }
}

export default Frame
