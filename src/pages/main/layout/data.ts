import moment from 'moment';
import { CompanyInfo, BasicParams, WarehouseInfo, BasicInfo } from '../../../types';
import { FORMAT_SHOW_TIME } from '../../../constants';

export interface StateData {
  basicParams: BasicParams,
  companyInfo: Array<CompanyInfo>,
  warehouseInfo: Array<WarehouseInfo>,
  companyName: string,
  warehouseName: string,
  basicInfo: BasicInfo,
  day: string,
  startTwoWeeks: string,
  startDay: string,
  endDay: string,
  month: string,
  startMonth: string,
  endMonth: string,
  showYear: number,
  showMonth: number,
  showDay: number,
  showTime: string,
}

export const stateData: StateData = {
  basicParams: {
    token: '',
    warehouseCode: '',
    companyCode: '',
  },
  companyInfo: [],
  warehouseInfo: [],
  companyName: '',
  warehouseName: '',
  basicInfo: {
    area: '',
    empQty: '',
    skuNum: '',
    stockNum: '',
    outboundNum: '',
    inboundNum: '',
    returnOrderNum: '',
  },
  day: moment().format('YYYY-MM-DD'),
  startTwoWeeks: moment(new Date().getTime() - 14 * 24 * 3600 * 1000).format('YYYY-MM-DD'),
  startDay: moment(new Date().getTime() - 6 * 24 * 3600 * 1000).format('YYYY-MM-DD'),
  endDay: moment(new Date().getTime() - 1 * 24 * 3600 * 1000).format('YYYY-MM-DD'),
  month: moment().format('YYYY-MM'),
  startMonth: moment(new Date().getTime() - 7 * 30 * 24 * 3600 * 1000).format('YYYY-MM'),
  endMonth: `${new Date().getFullYear()}-${new Date().getMonth() === 0 ? 12 : new Date().getMonth()}`,
  showYear: new Date().getFullYear(),
  showMonth: new Date().getMonth() + 1,
  showDay: new Date().getDate(),
  showTime: moment().format(FORMAT_SHOW_TIME),
}