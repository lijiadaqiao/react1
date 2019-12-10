import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Card,Upload,Spin}from 'antd'
import axios from 'axios'

import {changeAvatar}from "../../actions/user"

const mapState=state=>({
  avatarUrl:state.user.avatar
})

@connect(mapState,{changeAvatar})
 class Profile extends Component {
  state ={
    isUploading:false,
    // avatarUrl:'http://i2.tiimg.com/705605/b355bccfbcf6dde8.png'
  }

  handleUploadAvatar=({file})=>{
   
    const data=new FormData()
    data.append('Token','49220e71a873e1c9fc46ee1ad34b74bfbfa46618:CGtD07qirTqRz8Kx2JYVqrnIKWc=:eyJkZWFkbGluZSI6MTU3NTk3NDk0NCwiYWN0aW9uIjoiZ2V0IiwidWlkIjoiNzA1NjA1IiwiYWlkIjoiMTY1MTU3OCIsImZyb20iOiJmaWxlIn0=')
    data.append('file',file)

    this.setState=({
      isUploading:true
    })
    axios.post('http://up.imgapi.com/',data)
      .then(resp=>{
        
       
        if (resp.status===200) {
          
          this.setState=({
            isUploading:true,
            
          })
          this.props.changeAvatar(resp.data.linkurl)
        }else{
          console.log('err')
        }
      })
      .catch(err=>{
        console.log(err)
      })
  }
  render() {
    console.log(this.state.avatarUrl)
    return (
     <Card
     title='个人设置'
     bordered={false}
     >
       <Upload
       showUploadList={false}
       customRequest={this.handleUploadAvatar}
       >
        
    <Spin
    spinning={this.state.isUploading}
    >
      {
      this.props.avatarUrl?<img style={{width:78,height:78}}  src={this.props.avatarUrl} alt='' />
      :<span style={{border:'2px dashed #dedede',
        width:80,height:80,
        display:'block'} }>
         点击上传 </span>
      }</Spin>
        
       </Upload>
     </Card>
    )
  }
}
export default Profile