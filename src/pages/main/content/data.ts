import moment from 'moment';
import { 
  OrderScheduleNodeItem, 
  TransportScheduleNodeItem, 
  OrderNodeListItem,
  TransportNodeListItem,
  TransportDeliverItem,
  TurnoverRateItem,
  SkuTurnoverRateItem,
  PersonRateItem,
  TopNItem,
  AccuracyRateItem,
  LowStockRateItem,
  LocatorRateItem,
  TransportTimelyRateItem,
  TimelyRateItem,
  TransportPpmItem,
  SkuStockDisItem,
  OrderFlowList,
  CompanyInfo, 
  BasicParams, 
  WarehouseInfo, 
  BasicInfo
} from '../../../types';
import { FORMAT_SHOW_TIME } from '../../../constants';

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

  orderScheduleNodeItems: OrderScheduleNodeItem[],
  transportScheduleNodeItems: TransportScheduleNodeItem[],
  orderNodeListItems: OrderNodeListItem[],
  orderNodeListXItems: Array<string>,
  transportNodeListItems: TransportNodeListItem[],
  transportNodeListXItems: Array<string>,
  transportDeliverItems: TransportDeliverItem[],
  transportDeliverXItems: Array<string>,
  turnoverRateItems: TurnoverRateItem[],
  turnoverRateXItems: Array<string>,
  skuTurnoverRateItems: SkuTurnoverRateItem[],
  skuTurnoverRateXItems: Array<string>,
  personRateItems: PersonRateItem[],
  personRateXItems: Array<string>,
  sendTopNItems: TopNItem,
  receiveTopNItems: TopNItem,
  accuracyRateItems: AccuracyRateItem[],
  accuracyRateXItems: Array<string>,
  lowStockRateItems: LowStockRateItem[],
  lowStockRateXItems: Array<string>,
  locatorRateItems: LocatorRateItem[],
  locatorRateXItems: Array<string>,
  transportTimelyRateItems: TransportTimelyRateItem[],
  transportTimelyRateXItems: Array<string>,
  timelyRateItems: TimelyRateItem[],
  timelyRateXItems: Array<string>,
  transportPpmItems: TransportPpmItem[],
  transportPpmXItems: Array<string>,
  skuStockDisItems: SkuStockDisItem[],
  skuStockDisXItems: Array<string>,
  topNum: number, // topN展示
  shouldUpdate: boolean, // 页面更新标志
  timer: any,
  orderFlowList: OrderFlowList,
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

  orderScheduleNodeItems: [],
  transportScheduleNodeItems: [],
  orderNodeListItems: [],
  orderNodeListXItems: [],
  transportNodeListItems: [],
  transportNodeListXItems: [],
  transportDeliverItems: [],
  transportDeliverXItems: [],
  turnoverRateItems: [],
  turnoverRateXItems: [],
  skuTurnoverRateItems: [],
  skuTurnoverRateXItems: [],
  personRateItems: [],
  personRateXItems: [],
  sendTopNItems: [],
  receiveTopNItems: [],
  accuracyRateItems: [],
  accuracyRateXItems: [],
  lowStockRateItems: [],
  lowStockRateXItems: [],
  locatorRateItems: [],
  locatorRateXItems: [],
  transportTimelyRateItems: [],
  transportTimelyRateXItems: [],
  timelyRateItems: [],
  timelyRateXItems: [],
  transportPpmItems: [],
  transportPpmXItems: [],
  skuStockDisItems: [],
  skuStockDisXItems: [],
  topNum: 10,
  shouldUpdate: true,
  timer: null,
  orderFlowList: [],
}