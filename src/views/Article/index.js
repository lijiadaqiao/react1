import React, { Component } from 'react'
import { Card ,Button,Table,Tag,Icon} from 'antd'
import moment from 'moment'

import {getArticles}from '../../requests/requests'
const ButtonGroup = Button.Group

const displayTitle={
  id:'id',
  title:'标题',
  author:'作者',
  createAt:'创建时间',
  amount:'阅读量'

}


export default class ArticleList extends Component {
  constructor(){
    super()
    this.state={
      dataSource : [        
      ],
      columns : [
       
      ],
      total:0,
      isLoing:false
    }
     
  }
  createColumns=(columnkeys)=>{
    const columns=columnkeys.map(item=>{
      if (item==='amount') {
        return {
          title:displayTitle[item],
          dataIndex: item,
          render:(record)=>{
            const  amount=record
           return  <Tag color={amount>200?'red':'green'}>{record}</Tag>
          }
        }
      }if (item==='createAt') {
        return {
          title:displayTitle[item],
          dataIndex: item,
          render:(record)=>{
            const  createAt=record
           return  moment(createAt).format("YYYY年MM月DD日 HH:mm:ss:")
          }
        }
      }
      return {
        title:displayTitle[item],
        dataIndex: item,
        key: item,
      }
    })
    columns.push({
      title:'操作',
      key:'action',
      render:()=>{
        return( <ButtonGroup>
          <Button size='small' type='primary'>编辑</Button>
          <Button size='small' type='danger'>删除</Button>
        </ButtonGroup>)
      }
    })
    return columns
  }
  getData=()=>{
    this.setState({
      isLoing:true
    })
    getArticles()
    .then(resp=>{
      const columnkeys=Object.keys(resp.list[0])
      const columns=this.createColumns(columnkeys)
      this.setState({
        total:resp.total,
        columns,
        dataSource:resp.list,
       
      })
    })
    .catch(err=>{

    })
    .finally(()=>{
      this.setState({
        isLoing:false
      })
    })
  }
  componentDidMount(){
    this.getData()
  }
  render() {
    return (
      <Card 
      title="文章列表"
      extra={<Button>导出excel</Button>}
       bordered={false} 
       >
    
      <Table 
      rowkey={record=>record.id}
      dataSource={this.state.dataSource}
       columns={this.state.columns} 
       loading={this.state.isLoing}
       pagination={{
        total:this.state.total,
        pageSize:10,
        hideOnSinglePage:true
       }}
       />;
    </Card>
    )
  }
}

