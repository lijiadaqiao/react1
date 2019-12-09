import React, { Component ,createRef} from 'react'
import {
  Card,
  Button,
  Form,   
  Input,
  DatePicker ,
  Spin,
  message
}from 'antd'
import moment from 'moment'
import './index.less'
import E from 'wangeditor'


import {getArticleByID,saveArticle}from "../../requests/requests"

@Form.create()
 class Edit extends Component {
   constructor(){
     super()
     this.editorRef=createRef()
     this.state={
       isLoading:false
     }
   }
   handleSubmit=(e)=>{
     e.preventDefault()
     
     this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        const data =Object.assign({},values,{
          createAt:values.createAt.valueOf()
        })
        
        saveArticle(this.props.match.params.id,data)
          .then(resp=>{
            
            message.success('保存成功')
            //如果需要跳转
            this.props.history.push('/admin/article')
          })
          .finally(()=>{
            this.setState({
              isLoading:false
            })
          })
      }
    });
   }

   initEditor=()=>{
    this.editor = new E(this.editorRef.current)
    this.editor.customConfig.onchange = (html) => {
      // html 即变化之后的内容
      
      this.props.form.setFieldsValue({
        content: html,
      });
  }
    this.editor.create()
   }
   componentDidMount(){
     
     this.initEditor()
     this.setState({
       isLoading:true
     })
     getArticleByID(this.props.match.params.id)
      .then(resp=>{
        const {id,...data}=resp
        data.createAt=moment(data.createAt)
        this.props.form.setFieldsValue(data)
        this.editor.txt.html(data.content)
        // this.props.form.setFieldsValue({
        //   title:resp.title,
        //   amount:resp.amount,
        //   author:resp.author,
        //   createAt:moment(resp.createAt),
        //   content:resp.content
        // })
      })
      .finally(()=>{
        this.setState({
          isLoading:false
        })
      })
   }
  render() {
    const {
      getFieldDecorator
    }=this.props.form
    return (
      <Card 
      title="编辑文章"
      extra={<Button onClick={this.props.history.goBack}>取消</Button>}
       bordered={false} 
       >
        <Spin spinning={this.state.isLoading}>
        <Form onSubmit={this.handleSubmit} labelCol={{
          span:4
        }}
        wrapperCol={{
          span:16
        }}
        >

        <Form.Item
        label="标题"
        >
          {getFieldDecorator('title', {
            rules: [
              {required: true, message: '标题必须填!' }
              
            ],
          })(
            <Input
              placeholder="标题"
            />,
          )}
        </Form.Item>
        <Form.Item
        label="作者"
        >
          {getFieldDecorator('author', {
            rules: [
              {required: true, message: '作者必须填!' }
              
            ],
          })(
            <Input
              placeholder="admin"
            />,
          )}
          
        
        </Form.Item>
        <Form.Item
        label="阅读量"
        >
          {getFieldDecorator('amount', {
            rules: [
              {required: true, message: '阅读量必须填!' }
              
            ],
          })(
            <Input
              placeholder="0"
            />,
          )}
        </Form.Item>
        <Form.Item
        label="发布时间"
        >
          {getFieldDecorator('createAt', {
            rules: [
              {required: true, message: '时间必须填!' }
              
            ],
          })(
            <DatePicker showTime placeholder="选择时间"  />
 
          )}
        </Form.Item>
        <Form.Item
        label="内容"
        >
          {getFieldDecorator('content', {
            rules: [
              {required: true, message: '内容必须填!' }
              
            ]
          
          })(
            <div className="qf-editor" ref={this.editorRef}></div>
          )}
          
        
        </Form.Item>
        <Form.Item  wrapperCol={{
          span:12,offset:4
        }}>
         <Button type="primary" htmlType="submit" className="login-form-button">
            提交
          </Button>
        </Form.Item>
        
        </Form>
        </Spin>
      </Card>
    )
  }
}
export default Edit