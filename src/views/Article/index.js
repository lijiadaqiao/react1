import React, { Component } from 'react'
import {
   Card ,
   Button,
   Table,
   Tag,
   Typography,
   Modal,
   message,
   Tooltip
  } from 'antd'
import moment from 'moment'
import XLSX from 'xlsx'
import {getArticles,deleteArticles}from '../../requests/requests'
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
      isLoing:false,
      offset:0,
      limited:10,
      deleteArticleTitle:'',
      isShowArticleModal:false,
      deleteArticleConfirmLoading:false,
      DeleteArticleId:null
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
           return  (<Tooltip title={amount>200?'没超过200':'超过200'}>
             <Tag color={amount>200?'red':'green'}>
               {record}</Tag></Tooltip>)
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
      
      render:(text,record)=>{
        
        return( <ButtonGroup>
          <Button size='small' type='primary' onClick={this.toEdit.bind(this,record)}>编辑</Button>
          <Button size='small' type='danger' onClick={this.showDeleteArticleModel.bind(this,record)}>删除</Button>
        </ButtonGroup>)
      }
    })
    return columns
  }
  toEdit=(record)=>{
    this.props.history.push({
      pathname:`/admin/article/edit/${record.id}`,
      state:{
        title:record.title
    }})
  }
  showDeleteArticleModel(record){
    //使用函数的方式，定制化没那么强
    // Modal.confirm({
    //   title:<Typography>确认要删除吗<span >{record.title}</span>？</Typography>,
    //   content:'此操作不可逆，请谨慎',
    //   okText:'残忍删除',
    //   onOk(){
    //     deleteArticles(record.id)
    //     .then(resp=>{
    //       console.log(resp)
    //     })
    //   }
    // })
    this.setState({
      isShowArticleModal:true,
      deleteArticleTitle:record.title,
      DeleteArticleId:record.id
    })
  }
  deleteArticle=()=>{
    console.log(this.state.DeleteArticleId)
    this.setState({
     deleteArticleConfirmLoading:true
    })
    deleteArticles(this.state.DeleteArticleId)
    .then(resp=>{
      message.success(resp.msg)
      //这里沟通后确定到当前页还是第一页
      this.setState({
        offset:0
      },()=>{
        this.getData()
      })
     })
     .finally(()=>{
      this.setState({
        deleteArticleConfirmLoading:false,
        isShowArticleModal:false
       })
     })
  }
  hideDeleteModal=()=>{
    this.setState({
      isShowArticleModal:false,
      deleteArticleTitle:'',
      deleteArticleConfirmLoading:false
    })
  }
  getData=()=>{
    this.setState({
      isLoing:true
    })
    getArticles(this.state.offset,this.state.limited)
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
  onPageChange=(page,pageSize)=>{
    this.setState({
      offset:pageSize*(page-1),
      limited:pageSize
    }
    ,()=>{
      this.getData()
    })
  }

  onShowSizeChange=(current, size)=>{
    this.setState({
      offset:0,
      limited:size
    }
    ,()=>{
      this.getData()
    })
  }
  toExcel=()=>{
    //前段向后端请求，下载文件地址
    const data=[Object.keys(this.state.dataSource[0])]
    for(let i=0;i<this.state.dataSource.length;i++){
      data.push(Object.values(this.state.dataSource[i]))
    }
    console.log(data)
    const ws = XLSX.utils.aoa_to_sheet(data);
		const wb = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
		/* generate XLSX file and send to client */
    XLSX.writeFile(wb, `sheetjs-${this.state.offset/this.state.limited+1}
     ${moment().format('YYYY-MM-DD HH-mm-ss')}.xlsx`)
  }
  componentDidMount(){
    this.getData()
  }
  render() {
    
    return (
      <Card 
      title="文章列表"
      extra={<Button onClick={this.toExcel}>导出excel</Button>}
       bordered={false} 
       >
    
      <Table 
      rowkey={record=>record.id}
      dataSource={this.state.dataSource}
       columns={this.state.columns} 
       loading={this.state.isLoing}
      
       pagination={{
        total:this.state.total,
        showQuickJumper:true,
        hideOnSinglePage:true,
        onChange:this.onPageChange,
        showSizeChanger:true,
        onShowSizeChange:this.onShowSizeChange,
        current:this.state.offset/this.state.limited+1
       }}
       />;
       <Modal 
       title='此操作不可逆，请谨慎'
       
       visible={this.state.isShowArticleModal}
       onCancel={this.hideDeleteModal}
       confirmLoading={this.state.deleteArticleConfirmLoading}
       onOk={this.deleteArticle}
       >
       <Typography>确认要删除吗<span style={{color:'red'}}>{this.state.deleteArticleTitle}</span>？</Typography>
       </Modal>
    </Card>
    )
  }
}

