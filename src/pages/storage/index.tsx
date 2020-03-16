import React, { Component } from 'react';
import {
  Layout,
  Row,
  Col,
} from 'antd';
import moment from 'moment';

import { REFRESH_TIME, FORMAT_SHOW_TIME } from '../../constants';
import { StackedHistogram } from '../../components/StackedHistogram';
import { DoubleHistogram } from '../../components/DoubleHistogram';
import { PolylineHistogram } from '../../components/PolylineHistogram';
import { Histogram } from '../../components/Histogram';
import { Polyline } from '../../components/Polyline';
import { CompanyInfo, WarehouseInfo, BasicInfo, BasicParams } from '../../types';
import {
  getCompanyInfo,
  getWarehouseInfo,
  getBasicInfo,
  getOrderScheduleNode,
  getOrderNodeList,
  getTurnoverRateList,
  getAccuracyRate,
  getLowStockRate,
  getLocatorRate,
  getTimelyRate,
  getSkuStockDis,
} from '../../service';
import {
  formatOrderScheduleNode,
  formatOrderNodeList,
  formatTurnoverRate,
  formatAccuracyRate,
  formatLowStockRate,
  formatLocatorRate,
  formatTimelyRate,
  formatSkuStockDis,
} from './format';
import {
  MainHeader,
  StorageHeader,
} from '../../components/BasicHeader';
import { stateData } from './data';
import './index.css';

const {
  Header,
  Content,
} = Layout;

interface Props {
  token: string
}

class StorageLayout extends Component<Props> {
  state = {
    ...stateData
  };
  async componentDidMount() {
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
    const { code: warehouseCode, name: warehouseName } = warehouseInfo[0];
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
    // 库存周转率年份未考虑跨年 修改
    const endMonth = `${new Date().getMonth() === 0 ? new Date().getFullYear() - 1 : new Date().getFullYear()}-${new Date().getMonth() === 0 ? 12 : new Date().getMonth() >= 10
      ? new Date().getMonth()
      : `0${new Date().getMonth()}`}`;
    const basicInfo: BasicInfo = await getBasicInfo(basicParams, endDay);
    this.setState({
      companyInfo,
      warehouseInfo,
      companyName,
      warehouseName,
      basicParams,
      basicInfo,
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
    const { basicParams, day, startTwoWeeks, startDay, endDay, endMonth, startMonth } = this.state;
    await Promise.all([
      new Promise(async () => {
        const orderScheduleNode = await getOrderScheduleNode(basicParams, day);
        const orderScheduleNodeItems = formatOrderScheduleNode(orderScheduleNode);
        this.setState({ orderScheduleNodeItems });
      }),
      new Promise(async () => {
        const orderNodeList = await getOrderNodeList(basicParams, startDay, day);
        const orderNodeListItems = formatOrderNodeList(orderNodeList);
        const orderNodeListXItems = orderNodeList.map(item => item.day.slice(5));
        this.setState({
          orderNodeListItems,
          orderNodeListXItems,
        })
      }),
      new Promise(async () => {
        const turnoverRateList = await getTurnoverRateList(basicParams, startMonth, endMonth);
        const turnoverRateItems = formatTurnoverRate(turnoverRateList);
        const turnoverRateXItems = turnoverRateList.map(item => item.name);
        this.setState({ turnoverRateItems, turnoverRateXItems });
      }),
      new Promise(async () => {
        const accuracyRate = await getAccuracyRate(basicParams, startTwoWeeks, endDay);
        const accuracyRateXItems = accuracyRate.map(item => item.name.slice(5));
        const accuracyRateItems = formatAccuracyRate(accuracyRate);
        this.setState({
          accuracyRateItems,
          accuracyRateXItems,
        })
      }),
      new Promise(async () => {
        const lowStockRate = await getLowStockRate(basicParams, startTwoWeeks, endDay);
        const lowStockRateXItems = lowStockRate.map(item => item.name.slice(5));
        const lowStockRateItems = formatLowStockRate(lowStockRate);
        this.setState({
          lowStockRateItems,
          lowStockRateXItems,
        })
      }),
      new Promise(async () => {
        const locatorRate = await getLocatorRate(basicParams, startTwoWeeks, endDay);
        const locatorRateXItems = locatorRate.map(item => item.name.slice(5));
        const locatorRateItems = formatLocatorRate(locatorRate);
        this.setState({ locatorRateItems, locatorRateXItems })
      }),
      new Promise(async () => {
        const timelyRate = await getTimelyRate(basicParams, startTwoWeeks, endDay);
        const timelyRateXItems = timelyRate.map(item => item.day.slice(5));
        const timelyRateItems = formatTimelyRate(timelyRate);
        this.setState({
          timelyRateXItems,
          timelyRateItems,
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
        this.setState({
          showYear: new Date().getFullYear(),
          showMonth: new Date().getMonth() + 1,
          showDay: new Date().getDate(),
          showTime: moment().format(FORMAT_SHOW_TIME),
        })
      })
    ])
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
      basicInfo: {
        area,
        returnOrderNum, // 累计退货订单数
        skuNum, // SKU数量
        stockNum, // 库存总数
        inboundNum, // 累计入库订单数
      }
    } = this.state;

    return (<>
      <Layout style={{ width: '100%', height: '100%' }}>
        <Header className='Header'>
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
        <Header className='subHeader'>
          <StorageHeader
            basicInfo={{ area, returnOrderNum, skuNum, stockNum, inboundNum }}
          />
        </Header>
        <Content className="content">
          <Row>
            <Col span={6} className="gridCol first-gridCol">
              <div className="wrapper">
                <StackedHistogram
                  title='当日实时任务进度'
                  color={['#4D7EFF', '#FF6383',]}
                  legend={['今日已完成', '今日未完成']}
                  xItems={['订单接收', '波次创建', '检货', '复核', '发运']}
                  series={this.state.orderScheduleNodeItems}
                />
              </div>
            </Col>
            <Col span={6} className="gridCol first-gridCol">
              <div className="wrapper">
                <DoubleHistogram
                  title='仓储任务进度跟踪'
                  color={['#4D7EFF', '#FF6383']}
                  legend={['已完成订单', '未完成订单']}
                  xItems={this.state.orderNodeListXItems}
                  series={this.state.orderNodeListItems}
                />
              </div>
            </Col>
            <Col span={6} className="gridCol first-gridCol">
              <div className="wrapper">
                <PolylineHistogram
                  title='仓储任务发运及时率'
                  color={['#00A7FC']}
                  legend={['已完成总订单量', '及时率']}
                  series={this.state.timelyRateItems}
                  xItems={this.state.timelyRateXItems}
                />
              </div>
            </Col>
            <Col span={6} className="gridCol first-gridCol gridColLast">
              <div className="wrapper">
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
            <Col span={6} className="gridCol second-gridCol">
              <div className="wrapper">
                <Histogram
                  title='库存周转率'
                  xItems={this.state.turnoverRateXItems}
                  series={this.state.turnoverRateItems}
                />
              </div>
            </Col>
            <Col span={6} className="gridCol second-gridCol">
              <div className="wrapper">
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
            <Col span={6} className="gridCol second-gridCol">
              <div className="wrapper">
                <Polyline
                  title='库存准确率'
                  color={['#064AD7']}
                  series={this.state.accuracyRateItems}
                  xItems={this.state.accuracyRateXItems}
                />
              </div>
            </Col>
            <Col span={6} className="gridCol second-gridCol gridColLast">
              <div className="wrapper">
                <Polyline
                  title='库位使用率'
                  color={['#064AD7']}
                  series={this.state.locatorRateItems}
                  xItems={this.state.locatorRateXItems}
                />
              </div>
            </Col>
          </Row>
        </Content>
      </Layout>
    </>)
  }
}

export default StorageLayout;
