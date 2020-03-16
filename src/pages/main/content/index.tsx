import React, { PureComponent } from "react";
import { Row, Col } from "antd";

import { REFRESH_TIME } from '../../../constants';
import { StackedHistogram } from '../../../components/StackedHistogram';
import { DoubleHistogram } from '../../../components/DoubleHistogram';
import { HorizontalHistogram } from '../../../components/HorizontalHistogram';
import { PolylineHistogram } from '../../../components/PolylineHistogram';
import { Histogram } from '../../../components/Histogram';
import { Polyline } from '../../../components/Polyline';
import { PathMap } from '../../../components/Map';

import { stateData, StateData } from './data';
import {  DimType } from '../../../service/transportApi'
import { BasicParams } from '../../../types';
import {
  getOrderScheduleNode,
  getTransportScheduleNode,
  getOrderNodeList,
  getTransportNodeList,
  getTransportDeliver,
  getTurnoverRateList,
  getSkuTurnoverRate,
  getPersonRate,
  getSendTopN,
  getReceiveTopN,
  getAccuracyRate,
  getLowStockRate,
  getLocatorRate,
  getTransportTimelyRate,
  getTimelyRate,
  getTransportPpm,
  getSkuStockDis,
  getOrderFlow,
} from '../../../service';
import {
  formatOrderScheduleNode,
  formatTransportScheduleNode,
  formatOrderNodeList,
  formatTransportNodeList,
  formatTransportDeliver,
  formatTurnoverRate,
  formatSkuTurnoverRate,
  formatPersonRate,
  formatTopN,
  formatAccuracyRate,
  formatLowStockRate,
  formatLocatorRate,
  formatTransportTimelyRate,
  formatTimelyRate,
  formatTransportPpm,
  formatSkuStockDis,
} from './format';

import './index.css';

interface Props {
  basicParams: BasicParams,
  day: string,
  startTwoWeeks: string,
  startDay: string,
  endDay: string,
  month: string,
  endMonth: string,
  startMonth: string,
  onRefresh: () => void,
}
class MainContent extends PureComponent<Props, StateData> {
  state = { ...stateData }
  componentWillReceiveProps() {
    const { timer } = this.state;
    clearTimeout(timer);
    this.setState({
      shouldUpdate: true,
      timer: null,
    });
  }
  componentDidUpdate() {
    const { basicParams } = this.props;
    const { shouldUpdate, timer } = this.state;
    const { warehouseCode, companyCode } = basicParams;
    if (warehouseCode && companyCode && shouldUpdate) {
      this.getData();
    }
    if (timer === null) {
      const newTimer = setInterval(async () => {
        this.getData();
      }, REFRESH_TIME)
      this.setState({
        timer: newTimer
      })
    }
  }

  async getData() {
    const { basicParams, day, startTwoWeeks, startDay, endDay, month, endMonth, startMonth, onRefresh } = this.props;
    const { topNum } = this.state;
    await Promise.all([
      new Promise(async () => {
        const orderScheduleNode = await getOrderScheduleNode(basicParams, day);
        const orderScheduleNodeItems = formatOrderScheduleNode(orderScheduleNode);
        this.setState({ orderScheduleNodeItems });
      }),
      new Promise(async () => {
        const transportScheduleNode = await getTransportScheduleNode(basicParams, day);
        const transportScheduleNodeItems = formatTransportScheduleNode(transportScheduleNode);
        this.setState({ transportScheduleNodeItems });
      }),
      new Promise(async () => {
        const orderNodeList = await getOrderNodeList(basicParams, startDay, day);
        const orderNodeListItems = formatOrderNodeList(orderNodeList);
        const orderNodeListXItems = orderNodeList.map(item => item.day);
        this.setState({
          orderNodeListItems,
          orderNodeListXItems,
        })
      }),
      new Promise(async () => {
        const transportNodeList = await getTransportNodeList(basicParams, startDay, day);
        const transportNodeListItems = formatTransportNodeList(transportNodeList);
        const transportNodeListXItems = transportNodeList.map(item => item.day);
        this.setState({
          transportNodeListItems,
          transportNodeListXItems,
        })
      }),
      new Promise(async () => {
        const transportDeliver = await getTransportDeliver(basicParams, endDay);
        const { deliver } = transportDeliver;
        const transportDeliverItems = formatTransportDeliver(transportDeliver);
        const transportDeliverXItems = Object.keys(deliver);
        this.setState({
          transportDeliverItems,
          transportDeliverXItems,
        })
      }),
      new Promise(async () => {
        const turnoverRateList = await getTurnoverRateList(basicParams, startMonth, endMonth);
        const turnoverRateItems = formatTurnoverRate(turnoverRateList);
        const turnoverRateXItems = turnoverRateList.map(item => item.name);
        this.setState({ turnoverRateItems, turnoverRateXItems });
      }),
      new Promise(async () => {
        const skuTurnoverRate = await getSkuTurnoverRate(basicParams, month);
        const skuTurnoverRateXItems = skuTurnoverRate.map(item => item.name);
        const skuTurnoverRateItems = formatSkuTurnoverRate(skuTurnoverRate);
        this.setState({
          skuTurnoverRateItems,
          skuTurnoverRateXItems,
        })
      }),
      new Promise(async () => {
        const personRate = await getPersonRate(basicParams, startTwoWeeks, endDay);
        const personRateItems = formatPersonRate(personRate);
        const personRateXItems = personRate.map(item => item.name);
        this.setState({
          personRateItems,
          personRateXItems,
        })
      }),
      new Promise(async () => {
        const sendTopN = await getSendTopN(basicParams, day, topNum);
        const sendTopNItems = formatTopN(sendTopN);
        this.setState({
          sendTopNItems,
        });
      }),
      new Promise(async () => {
        const receiveTopN = await getReceiveTopN(basicParams, day, topNum, DimType.日维度);
        const receiveTopNItems = formatTopN(receiveTopN);
        this.setState({
          receiveTopNItems,
        })
      }),
      new Promise(async () => {
        const accuracyRate = await getAccuracyRate(basicParams, startTwoWeeks, endDay);
        const accuracyRateXItems = accuracyRate.map(item => item.name);
        const accuracyRateItems = formatAccuracyRate(accuracyRate);
        this.setState({
          accuracyRateItems,
          accuracyRateXItems,
        })
      }),
      new Promise(async () => {
        const lowStockRate = await getLowStockRate(basicParams, startTwoWeeks, endDay);
        const lowStockRateXItems = lowStockRate.map(item => item.name);
        const lowStockRateItems = formatLowStockRate(lowStockRate);
        this.setState({
          lowStockRateItems,
          lowStockRateXItems,
        })
      }),
      new Promise(async () => {
        const locatorRate = await getLocatorRate(basicParams, startTwoWeeks, endDay);
        const locatorRateXItems = locatorRate.map(item => item.name);
        const locatorRateItems = formatLocatorRate(locatorRate);
        this.setState({ locatorRateItems, locatorRateXItems })
      }),
      new Promise(async () => {
        const transportTimelyRate = await getTransportTimelyRate(basicParams, startTwoWeeks, endDay);
        const transportTimelyRateXItems = transportTimelyRate.map(item => item.day);
        const transportTimelyRateItems = formatTransportTimelyRate(transportTimelyRate);
        this.setState({
          transportTimelyRateItems,
          transportTimelyRateXItems,
        })
      }),
      new Promise(async () => {
        const timelyRate = await getTimelyRate(basicParams, startTwoWeeks, endDay);
        const timelyRateXItems = timelyRate.map(item => item.day);
        const timelyRateItems = formatTimelyRate(timelyRate);
        this.setState({
          timelyRateXItems,
          timelyRateItems,
        })
      }),
      new Promise(async () => {
        const transportPpm = await getTransportPpm(basicParams, startDay, day);
        const transportPpmXItems = transportPpm.map(item => item.day);
        const transportPpmItems = formatTransportPpm(transportPpm);
        this.setState({
          transportPpmItems,
          transportPpmXItems,
        })
      }),
      new Promise(async () => {
        const skuStockDis = await getSkuStockDis(basicParams, endDay);
        const skuStockDisXItems = skuStockDis.map(item => item.classify);
        const skuStockDisItems = formatSkuStockDis(skuStockDis);
        this.setState({
          skuStockDisItems,
          skuStockDisXItems,
        })
      }),
      new Promise(async () => {
        const orderFlowList = await getOrderFlow(basicParams, day, DimType.月维度);
        this.setState({
          orderFlowList,
        })
      }),
      this.setState({ shouldUpdate: false }),
      onRefresh(),
    ]);
  }
  render() {
    return (
      <>
        <Row>
          <Col className='side' span={8}>
            <Row className='wrapper'>
              <div className='chartItem'>
                <StackedHistogram
                  title='仓库全流程监控：当日实时任务进度'
                  color={['#FF9F40', '#FF6383', '#4D7EFF']}
                  legend={['历史未完成', '今日未完成', '今日已完成']}
                  xItems={['订单接收', '波次创建', '检货', '复核', '发运']}
                  series={this.state.orderScheduleNodeItems}
                />
              </div>
            </Row>
            <Row>
              <Col className='wrapper' span={12}>
                <div className='chartItem'>
                  <DoubleHistogram
                    title='仓储任务进度跟踪'
                    color={['#4D7EFF', '#FF6383']}
                    legend={['已完成订单', '未完成订单']}
                    xItems={this.state.orderNodeListXItems}
                    series={this.state.orderNodeListItems}
                  />
                </div>
              </Col>
              <Col className='wrapper' span={12}>
                <div className='chartItem'>
                  <PolylineHistogram
                    title='仓储任务发运及时率'
                    color={['#00A7FC']}
                    legend={['已完成总订单量', '及时率']}
                    series={this.state.timelyRateItems}
                    xItems={this.state.timelyRateXItems}
                  />
                </div>
              </Col>
            </Row>
            <Row>
              <Col className='wrapper' span={12}>
                <div className='chartItem'>
                  <Polyline
                    title='库存准确率'
                    color={['#064AD7']}
                    series={this.state.accuracyRateItems}
                    xItems={this.state.accuracyRateXItems}
                  />
                </div>
              </Col>
              <Col className='wrapper' span={12}>
                <div className='chartItem'>
                  <Polyline
                    title='库存低储率'
                    color={['#C95FF2']}
                    series={this.state.lowStockRateItems}
                    xItems={this.state.lowStockRateXItems}
                    startColor='#c95ff266'
                    endColor='#c95ff200'
                  />
                </div>
              </Col>
            </Row>
            <Row>
              <Col className='wrapper' span={12}>
                <div className='chartItem'>
                  <Histogram
                    title='库存周转率'
                    xItems={this.state.turnoverRateXItems}
                    series={this.state.turnoverRateItems}
                  />
                </div>
              </Col>
              <Col className='wrapper' span={12}>
                <div className='chartItem'>
                  <Histogram
                    title='各SKU库存分类当月库存周转率'
                    xItems={this.state.skuTurnoverRateXItems}
                    series={this.state.skuTurnoverRateItems}
                  />
                </div>
              </Col>
            </Row>
          </Col>
          <Col className='center' span={8}>
            <Row className='wrapper wrapper-map'>
              <div className='chartItem'>
                <PathMap title="当日订单流向" orderFlowList={this.state.orderFlowList} />
              </div>
            </Row>
            <Row>
              <Col className='wrapper wrapper-statics' span={12}>
                <div className='chartItem'>
                  <HorizontalHistogram
                    title='发件量TOP 10'
                    startColor='#00A7FC'
                    endColor='#064AD7'
                    series={this.state.sendTopNItems}
                  />
                </div>
              </Col>
              <Col className='wrapper wrapper-statics' span={12}>
                <div className='chartItem'>
                  <HorizontalHistogram
                    title='收件量TOP 10'
                    startColor='#E057FF'
                    endColor='#5400FF'
                    series={this.state.receiveTopNItems}
                  />
                </div>
              </Col>
            </Row>
            <Row className='wrapper'>
              <div className='chartItem'>
                <Polyline
                  title='库位使用率'
                  color={['#064AD7']}
                  series={this.state.locatorRateItems}
                  xItems={this.state.locatorRateXItems}
                />
              </div>
            </Row>
          </Col>
          <Col className='side' span={8}>
            <Row className='wrapper'>
              <div className='chartItem'>
                <StackedHistogram
                  title='运输全流程监控：当日实时任务进度'
                  color={['#FF9F40', '#FF6383', '#4D7EFF']}
                  legend={['历史未完成', '今日未完成', '今日已完成']}
                  xItems={['接单', '拆分', '运输', '总计']}
                  series={this.state.transportScheduleNodeItems}
                />
              </div>
            </Row>
            <Row>
              <Col className='wrapper' span={12}>
                <div className='chartItem'>
                  <DoubleHistogram
                    title='运输任务进度跟踪'
                    color={['#4D7EFF', '#FF6383']}
                    legend={['已完成订单', '未完成订单']}
                    xItems={this.state.transportNodeListXItems}
                    series={this.state.transportNodeListItems}
                  />
                </div>
              </Col>
              <Col className='wrapper' span={12}>
                <div className='chartItem'>
                  <Polyline
                    title='运输任务发货/到货及时率'
                    color={['#064AD7', '#C95FF2']}
                    legend={['到货率', '发货率']}
                    xItems={this.state.transportTimelyRateXItems}
                    series={this.state.transportTimelyRateItems}
                  />
                </div>
              </Col>
            </Row>
            <Row>
              <Col className='wrapper' span={12}>
                <div className='chartItem'>
                  <PolylineHistogram
                    title='货损货差PPM'
                    color={['#14C4C9']}
                    series={this.state.transportPpmItems}
                    xItems={this.state.transportPpmXItems}
                  />
                </div>
              </Col>
              <Col className='wrapper' span={12}>
                <div className='chartItem'>
                  <DoubleHistogram
                    title='订单交付/延误时长分布'
                    color={['#7C6AF2', '#C95FF2']}
                    xItems={this.state.transportDeliverXItems}
                    series={this.state.transportDeliverItems}
                    legend={['交付', '延误']}
                  />
                </div>
              </Col>
            </Row>
            <Row>
              <Col className='wrapper' span={12}>
                <div className='chartItem'>
                  <Histogram
                    title='仓库人均效率'
                    xItems={this.state.personRateXItems}
                    series={this.state.personRateItems}
                  />
                </div>
              </Col>
              <Col className='wrapper' span={12}>
                <div className='chartItem'>
                  <StackedHistogram
                    title='各类SKU库存天数分布'
                    color={['#C95FF2', '#4D7EFF', '#14C4C9', '#FF6383', '#FF9F40']}
                    legend={['0-30天', '31-60天', '61-90天', '91-120天', '>120天']}
                    vertical
                    xItems={this.state.skuStockDisXItems}
                    series={this.state.skuStockDisItems}
                  />
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </>
    )
  }
}

export { MainContent };
