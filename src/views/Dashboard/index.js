import React, { Component,createRef } from 'react'
import{
  Card,
  Row,
  Col
}from 'antd'
import {getArticleMount}from '../../requests/requests'
import echarts from 'echarts'
import './dashboard.less'


export default class Dashboard extends Component {
  constructor(){
    super()
    this.articleAmount=createRef()
  }

  initArticleChart=()=>{
    this.articleChart=echarts.init(this.articleAmount.current)

    getArticleMount()
      .then(resp=>{
        console.log(resp)
        var option = {
      
          xAxis: {
            type:'category',
            boundaryGap:false,
              data: resp.amount.map(item=>item.month)
          },
          yAxis: {
            type: 'value'
        },
        series: [{
          data: resp.amount.map(item=>item.value),
          type: 'line',
          areaStyle: {}
      }]
      };
        // 使用刚指定的配置项和数据显示图表。
       this.articleChart.setOption(option);
      })
    
  
  }

  componentDidMount(){
    this.initArticleChart()
  }


  render() {
    return (
      <>
        <Card
      title="概览"      
       bordered={false} 
       >
         <Row gutter={16}>
      <Col className="gutter-row" span={6}>
        <div className="qf-gutter-box" style={{backgroundColor:'#03A9F4'}}>col-6</div>
      </Col>
      <Col className="gutter-row" span={6}>
        <div className="qf-gutter-box" style={{backgroundColor:'#FFEE58'}}>col-6</div>
      </Col>
      <Col className="gutter-row" span={6}>
        <div className="qf-gutter-box" style={{backgroundColor:'#607D8B'}}>col-6</div>
      </Col>
      <Col className="gutter-row" span={6}>
        <div className="qf-gutter-box" style={{backgroundColor:'#7B1FA2'}}>col-6</div>
      </Col>
    </Row>
        </Card>
        <Card
        title="最近浏览量"      
        bordered={false} 
        >
          <div ref={this.articleAmount} style={{height:'400px'}}/>
        </Card>
      </>
    )
  }
}
