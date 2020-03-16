import moment from 'moment';
import {
  TransportScheduleNodeItem, 
  TransportNodeListItem,
  TransportSendItem,
  TransportDelayItem,
  TopNItem,
  TransportTimelyReceiveRateItem,
  TransportPpmTransItem,
  OrderFlowList,
  // 基本信息
  CompanyInfo, 
  BasicParams, 
  WarehouseInfo,
} from '../../types';
import { FORMAT_SHOW_TIME } from '../../constants';


export interface StateData {
  /**基本信息 */
  basicParams: BasicParams,
  companyInfo: Array<CompanyInfo>,
  warehouseInfo: Array<WarehouseInfo>,
  companyName: string,
  warehouseName: string,
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

  transportScheduleNodeItems: TransportScheduleNodeItem[], // 运输全流程监控：当前实时任务进度 图表展示项
  transportNodeListItems: TransportNodeListItem[], // 运输任务进度跟踪
  transportNodeListXItems: Array<string>,
  transportSendItems: TransportSendItem[], // 订单交付时长分布
  transportSendXItems: Array<string>,
  transportDelayItems: TransportDelayItem[], // 订单延误时长分布
  transportDelayXItems: Array<string>,
  sendTopNItems: TopNItem, //  当日发件量 top n
  sendTopNMonthlyItems: TopNItem, // 当月发件量 top n
  transportTimelyRateItems: TransportTimelyReceiveRateItem[], // 运输任务到货及时率
  transportTimelyRateXItems: Array<string>,
  transportPpmTransItems: TransportPpmTransItem[], // 货差PPM
  transportPpmTransXItems: Array<string>,
  orderFlowList: OrderFlowList, // 当日发件量流向

  topNum: 5,
  timer: any,
}

export const stateData: StateData = {
  transportScheduleNodeItems: [],
  transportNodeListItems: [],
  transportNodeListXItems: [],
  transportSendItems: [],
  transportSendXItems: [],
  transportDelayItems: [],
  transportDelayXItems: [],
  sendTopNItems: [],
  sendTopNMonthlyItems: [],
  transportTimelyRateItems: [],
  transportTimelyRateXItems: [],
  transportPpmTransItems: [],
  transportPpmTransXItems: [],
  orderFlowList: [],
  topNum: 5,
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