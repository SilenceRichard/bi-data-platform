import moment from 'moment';
import React, { Component } from 'react';
import { Layout } from 'antd';

import { REFRESH_TIME, FORMAT_SHOW_TIME } from '../../constants';
import { MainHeader } from '../../components/BasicHeader';
import { HorizontalHistogram } from '../../components/HorizontalHistogram';
import { StackedHistogram } from '../../components/StackedHistogram';
import { Histogram } from '../../components/Histogram';
import { PathMap } from '../../components/Map';
import { DoubleHistogram } from '../../components/DoubleHistogram';
import { Polyline } from '../../components/Polyline';
import { CompanyInfo, WarehouseInfo, BasicParams } from '../../types';
import { StateData, stateData } from './data';
import './index.css';
import {
  formatTopN,
  formatTransportScheduleNode,
  formatTransportNodeList,
  formatTransportSend,
  formatTransportDelay,
  formatTransportPpmTrans,
  formatTransportTimelyReceiveRate,
} from './format';
import {
  getCompanyInfo,
  getWarehouseInfo,
  getOrderFlow, // 当日发件量流向
  getReceiveTopN, // 当日发件量TOPN
  getTransportScheduleNode, // 运输全流程监控：当前实时任务进度
  getTransportSend, // 订单交付时长分布
  getTransportNodeList, // 运输任务进度跟踪
  getTransportDelay, // 订单延误时长分布
  getTransportPpmTrans, // 货差PPM
  getTransportTimelyReceiveRate, // 运输到货及时率
  DimType,
} from '../../service';

interface Props {
  token: string,
}

const { Header, Content } = Layout;

class TransportLayout extends Component<Props, StateData> {
  state = {
    ...stateData
  }
  componentDidMount = async () => {
    await this.getBasicInfo();
    await this.getData();
  }

  componentDidUpdate() {
    const { timer } = this.state;
    if (timer === null) {
      const newTimer = setInterval(async () => {
        await this.getBasicInfo();
        await this.getData();
      }, REFRESH_TIME)
      this.setState({
        timer: newTimer
      })
    }
  }

  getBasicInfo = async () => {
    const { token } = this.props;
    const companyInfo: Array<CompanyInfo> = await getCompanyInfo(token);
    const { code: companyCode, name: companyName } = companyInfo[0];
    const warehouseInfo: Array<WarehouseInfo> = await getWarehouseInfo(companyCode, token);
    const { code: warehouseCode = '', name: warehouseName = '' } = warehouseInfo[0];
    const basicParams: BasicParams = { warehouseCode, companyCode, token };
    const day = moment().format('YYYY-MM-DD');
    const startTwoWeeks = moment(new Date().getTime() - 14 * 24 * 3600 * 1000).format('YYYY-MM-DD');
    const startDay = moment(new Date().getTime() - 6 * 24 * 3600 * 1000).format('YYYY-MM-DD');
    const endDay = moment(new Date().getTime() - 1 * 24 * 3600 * 1000).format('YYYY-MM-DD');
    const month = moment().format('YYYY-MM');
    const formatMonth = (new Date().getMonth() + 1).toString();
    let startMonth = month;
    switch (formatMonth) {
      case '1':
      case '2':
      case '3':
        // startMonth = `${new Date().getFullYear()}-0${(Number(formatMonth) + 6).toString()}`;
        startMonth = `${new Date().getFullYear() - 1}-0${(Number(formatMonth) + 6).toString()}`;
        break;
      case '4':
      case '5':
      case '6':
        startMonth = `${new Date().getFullYear()}-${(Number(formatMonth) + 6).toString()}`;
        break;
      default:
        startMonth = `${new Date().getFullYear()}-0${(Number(formatMonth) - 6).toString()}`
    }
    const endMonth = `${new Date().getFullYear()}-${new Date().getMonth() === 0 ? `${new Date().getMonth()}1` : new Date().getMonth() >= 10
      ? new Date().getMonth()
      : `0${new Date().getMonth()}`}`;
    // 货差 PPM 结束日期修改
    // const endMonth = `${new Date().getFullYear()}-${new Date().getMonth() === 0 ? 12 : new Date().getMonth() >= 10
    //   ? new Date().getMonth()
    //   : `0${new Date().getMonth()}`}`;
    this.setState({
      companyInfo,
      warehouseInfo,
      companyName,
      warehouseName,
      basicParams,
      day,
      startTwoWeeks,
      startDay,
      endDay,
      month,
      startMonth,
      endMonth
    })
  }

  getData = async () => {
    const { basicParams, day, topNum, startDay, endDay, startMonth, endMonth, startTwoWeeks } = this.state;
    await Promise.all([
      /**收件量topN  日维度*/
      new Promise(async () => {
        const orderScheduleNode = await getReceiveTopN(basicParams, day, topNum, DimType.日维度);
        const sendTopNItems = formatTopN(orderScheduleNode);
        this.setState({ sendTopNItems });
      }),
       /**收件量topN  月维度*/
       new Promise(async () => {
        const orderScheduleNode = await getReceiveTopN(basicParams, day, topNum, DimType.月维度);
        const sendTopNMonthlyItems = formatTopN(orderScheduleNode);
        this.setState({ sendTopNMonthlyItems });
      }),
      /**当日订单流向 */
      new Promise(async () => {
        const orderFlowList = await getOrderFlow(basicParams, day, DimType.月维度);
        this.setState({
          orderFlowList,
        })
      }),
      /**运输全流程监控 */
      new Promise(async () => {
        const transportScheduleNode = await getTransportScheduleNode(basicParams, day);
        const transportScheduleNodeItems = formatTransportScheduleNode(transportScheduleNode);
        this.setState({ transportScheduleNodeItems });
      }),
      /**运输任务进度跟踪 */
      new Promise(async () => {
        const transportNodeList = await getTransportNodeList(basicParams, startDay, day);
        const transportNodeListItems = formatTransportNodeList(transportNodeList);
        const transportNodeListXItems = transportNodeList.map(item => item.day.slice(5));
        this.setState({
          transportNodeListItems,
          transportNodeListXItems,
        })
      }),
      /**订单交付时长分布 */
      new Promise(async () => {
        const transportSend = await getTransportSend(basicParams, endDay);
        const transportSendItems = await formatTransportSend(transportSend);
        const transportSendXItems = Object.keys(transportSend);
        this.setState({ transportSendItems, transportSendXItems });
      }),
      /**订单延误时长分布 */
      new Promise(async () => {
        const transportDelay = await getTransportDelay(basicParams, endDay);
        const transportDelayItems = await formatTransportDelay(transportDelay);
        const transportDelayXItems = Object.keys(transportDelay);
        this.setState({ transportDelayItems, transportDelayXItems });
      }),
      /**货差PPM */
      new Promise(async () => {
        const transportPpmTrans = await getTransportPpmTrans(basicParams, startMonth, endMonth);
        const transportPpmTransItems = formatTransportPpmTrans(transportPpmTrans);
        const transportPpmTransXItems = transportPpmTrans.map(item => `${item.name.slice(0, 4)}${item.name.slice(4)}`);
        this.setState({ transportPpmTransItems, transportPpmTransXItems })
      }),
      /**运输到货及时率 */
      new Promise(async () => {
        const transportTimelyReceiveRate = await getTransportTimelyReceiveRate(basicParams, startTwoWeeks, endDay);
        const transportTimelyRateItems = await formatTransportTimelyReceiveRate(transportTimelyReceiveRate);
        const transportTimelyRateXItems = transportTimelyReceiveRate.map(item => item.day.slice(5));
        this.setState({ transportTimelyRateItems, transportTimelyRateXItems });
      }),
      new Promise(async () => {
        this.setState({
          showYear: new Date().getFullYear(),
          showMonth: new Date().getMonth() + 1,
          showDay: new Date().getDate(),
          showTime: moment().format(FORMAT_SHOW_TIME),
        })
      })
    ]);
  }

  render() {
    const {
      companyInfo,
      warehouseInfo,
      companyName,
      warehouseName,
      showYear,
      showMonth,
      showDay,
      showTime,
    } = this.state;

    return (<>
      <Layout style={{ width: '100%', height: '100%' }}>
        <Header className="Header">
          <MainHeader
            companyInfo={companyInfo}
            warehouseInfo={warehouseInfo}
            companyName={companyName}
            warehouseName={warehouseName}
            year={showYear}
            month={showMonth}
            day={showDay}
            time={showTime}
          />
        </Header>
        <Content>
          <Content className='sendTask'>
            <div className="staticWrapper">
              <HorizontalHistogram
                title='当日发件量TOP 5'
                startColor='#00A7FC'
                endColor='#064AD7'
                series={this.state.sendTopNItems}
              />
            </div>
            <div className="staticWrapper" style={{ marginTop: '2%' }}>
              <HorizontalHistogram
                title='本月发件量TOP 5'
                startColor='#00A7FC'
                endColor='#064AD7'
                series={this.state.sendTopNMonthlyItems}
              />
            </div>
          </Content>
          <Content className="topRight">
            <Content className="orderFlow">
              <PathMap title="本月订单流向" orderFlowList={this.state.orderFlowList} />
            </Content>
            <Content className="taskProgress">
              <StackedHistogram
                title='当日实时任务进度'
                color={['#FF9F40', '#4D7EFF', '#FF6383']}
                legend={['历史未完成', '今日已完成', '今日未完成']}
                xItems={['接单', '拆分', '运输', '总计']}
                series={this.state.transportScheduleNodeItems}
              />
            </Content>
            <Content className="taskFollow">
              <DoubleHistogram
                title='运输任务进度跟踪'
                color={['#4D7EFF', '#FF6383']}
                legend={['已完成订单', '未完成订单']}
                xItems={this.state.transportNodeListXItems}
                series={this.state.transportNodeListItems}
              />
            </Content>
          </Content>
          <Content className="bottomRight">
            <Content className="storeRate">
              <Polyline
                title='到货及时率'
                color={['#064AD7']}
                series={this.state.transportTimelyRateItems}
                xItems={this.state.transportTimelyRateXItems}
              />
            </Content>

            <Content className="orderTime">
              <Histogram
                title='订单交付时长分布'
                xItems={this.state.transportSendXItems}
                series={this.state.transportSendItems}
              />
            </Content>
            <Content className="sendDelay">
              <Histogram
                title='发货延误时长分布'
                xItems={this.state.transportDelayXItems}
                series={this.state.transportDelayItems}
              />
            </Content>
            <Content className="objectPPM">
              <Polyline
                title='货损率'
                color={['#064AD7']}
                xItems={this.state.transportPpmTransXItems}
                series={this.state.transportPpmTransItems}
              />
            </Content>
          </Content>

        </Content>
      </Layout>
    </>)
  }
}

export default TransportLayout;
