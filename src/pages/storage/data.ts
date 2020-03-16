import moment from 'moment';
import {
  OrderScheduleNodeItem, 
  OrderNodeListItem,
  TurnoverRateItem,
  AccuracyRateItem,
  LowStockRateItem,
  LocatorRateItem,
  TimelyRateItem,
  SkuStockDisItem,
  CompanyInfo, 
  BasicParams, 
  WarehouseInfo, 
  BasicInfo
} from '../../types';
import { FORMAT_SHOW_TIME } from '../../constants';

export interface StateData {
  /**基本信息 */
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

  orderScheduleNodeItems: OrderScheduleNodeItem[], // 仓库全流程监控： 当日实时任务进度
  orderNodeListItems: OrderNodeListItem[], // 仓储任务进度跟踪
  orderNodeListXItems: Array<string>,
  turnoverRateItems: TurnoverRateItem[], // 库存周转率
  turnoverRateXItems: Array<string>,
  accuracyRateItems: AccuracyRateItem[], // 库存准确率
  accuracyRateXItems: Array<string>,
  lowStockRateItems: LowStockRateItem[], // 库存低储率
  lowStockRateXItems: Array<string>,
  locatorRateItems: LocatorRateItem[], // 库位使用率
  locatorRateXItems: Array<string>,
  timelyRateItems: TimelyRateItem[], // 仓储任务发运及时率
  timelyRateXItems: Array<string>,
  skuStockDisItems: SkuStockDisItem[], // 各类SKU库存天数分布
  skuStockDisXItems: Array<string>,
  topNum: number, // topN展示
  timer: any,
}

export const stateData: StateData = {
  orderScheduleNodeItems: [],
  orderNodeListItems: [],
  orderNodeListXItems: [],
  turnoverRateItems: [],
  turnoverRateXItems: [],
  accuracyRateItems: [],
  accuracyRateXItems: [],
  lowStockRateItems: [],
  lowStockRateXItems: [],
  locatorRateItems: [],
  locatorRateXItems: [],
  timelyRateItems: [],
  timelyRateXItems: [],
  skuStockDisItems: [],
  skuStockDisXItems: [],
  topNum: 10,
  timer: null,

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