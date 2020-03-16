import React, { PureComponent } from 'react';
import moment from 'moment';
import { Layout } from 'antd';

import { MainHeader, SubHeader } from '../../../components/BasicHeader';
import { MainContent } from '../content';
import { stateData, StateData } from './data';
import { getCompanyInfo, getWarehouseInfo, getBasicInfo } from '../../../service';
import { CompanyInfo, WarehouseInfo, BasicInfo, BasicParams } from '../../../types';
import { FORMAT_SHOW_TIME } from '../../../constants';
import './index.css';

interface Props {
  token: string
}

const { Header, Content } = Layout;

class MainLayout extends PureComponent<Props, StateData> {
  state = { ...stateData }
  async componentWillMount() {
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
        startMonth = `${new Date().getFullYear()}-0${(Number(formatMonth) + 6).toString()}`;
        break;
      case '4':
      case '5':
      case '6':
        startMonth = `${new Date().getFullYear()}-${(Number(formatMonth) + 6).toString()}`;
        break;
      default:
        startMonth = `${new Date().getFullYear()}-0${(Number(formatMonth) - 6).toString()}`
    }
    const endMonth = `${new Date().getFullYear()}-${new Date().getMonth() === 0 ? 12 : new Date().getMonth() >= 10
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

  onChangeItem = async (key: string, type: 'warehouseCode' | 'companyCode') => {
    const day = moment().format('YYYY-MM-DD');
    const startTwoWeeks = moment(new Date().getTime() - 14 * 24 * 3600 * 1000).format('YYYY-MM-DD');
    const startDay = moment(new Date().getTime() - 6 * 24 * 3600 * 1000).format('YYYY-MM-DD');
    const endDay = moment(new Date().getTime() - 1 * 24 * 3600 * 1000).format('YYYY-MM-DD');
    const endMonth = `${new Date().getFullYear()}-${new Date().getMonth() === 0 ? 12 : new Date().getMonth() >= 10
      ? new Date().getMonth()
      : `0${new Date().getMonth()}`}`;
    const formatMonth = (new Date().getMonth() + 1).toString();
    let startMonth = formatMonth;
    switch (formatMonth) {
      case '1':
      case '2':
      case '3':
        startMonth = `${new Date().getFullYear()}-0${(Number(formatMonth) + 6).toString()}`;
        break;
      case '4':
      case '5':
      case '6':
        startMonth = `${new Date().getFullYear()}-${(Number(formatMonth) + 6).toString()}`;
        break;
      default:
        startMonth = `${new Date().getFullYear()}-0${(Number(formatMonth) - 6).toString()}`
    }
    if (type === 'companyCode') {
      const { token } = this.props;
      const { companyInfo } = this.state;
      const companyItem = companyInfo.find((item) => item.code === key)
      const companyName = companyItem ? companyItem.name : '';
      const companyCode = key;
      const warehouseInfo: Array<WarehouseInfo> = await getWarehouseInfo(companyCode, token);
      const { code: warehouseCode, name: warehouseName } = warehouseInfo[0];
      const basicParams: BasicParams = { warehouseCode, companyCode, token };
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
        startMonth,
        endMonth,
      })
    } else {
      const { warehouseInfo, basicParams: originBasicParams } = this.state;
      const warehouseCode = key;
      const warehouseItem = warehouseInfo.find((item) => item.code === key);
      const warehouseName = warehouseItem ? warehouseItem.name : '';
      const { companyCode } = originBasicParams;
      const { token } = this.props;
      const basicParams: BasicParams = { warehouseCode, companyCode, token };
      const basicInfo: BasicInfo = await getBasicInfo(basicParams, endDay);
      this.setState({
        warehouseName,
        basicParams,
        basicInfo,
        day,
        startDay,
        endDay,
      })
    }
  }

  render() {
    const { showYear, showMonth, showDay, showTime } = this.state;
    return (<>
      <Layout style={{ width: '100%', height: '100%' }}>
        <Header className='Header'>
          <MainHeader
            companyInfo={this.state.companyInfo}
            warehouseInfo={this.state.warehouseInfo}
            companyName={this.state.companyName}
            warehouseName={this.state.warehouseName}
            onChangeItem={(key: string, type: 'warehouseCode' | 'companyCode') => this.onChangeItem(key, type)}
            year={showYear}
            month={showMonth}
            day={showDay}
            time={showTime}
          />
        </Header>
        <Header className='subHeader'>
          <SubHeader
            basicInfo={this.state.basicInfo}
          />
        </Header>
        <Content>
          <MainContent
            basicParams={this.state.basicParams}
            day={this.state.day}
            startTwoWeeks={this.state.startTwoWeeks}
            startDay={this.state.startDay}
            endDay={this.state.endDay}
            month={this.state.month}
            endMonth={this.state.endMonth}
            startMonth={this.state.startMonth}
            onRefresh={() => this.setState({
              showYear: new Date().getFullYear(),
              showMonth: new Date().getMonth() + 1,
              showDay: new Date().getDate(),
              showTime: moment().format(FORMAT_SHOW_TIME),
            })}
          />
        </Content>
      </Layout>
    </>)
  }
}

export { MainLayout };
