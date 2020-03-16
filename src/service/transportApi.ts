import { $get } from '../utils/http';
import { 
  BasicParams, 
  TransportScheduleNode,
  TransportNodeList,
  TransportDeliver,
  TransportSend,
  TransportDelay,
  SkuTurnoverRate,
  PersonRate,
  TopN,
  TransportTimelyRate,
  TransportTimelyReceiveRate,
  TransportPpm,
  TransportPpmTrans,
  OrderFlowList,
} from '../types';
/**
 * 运输全流程监控：当前实时任务进度
 * @param basicParams 
 * @param day 
 */
export const getTransportScheduleNode = async function (basicParams: BasicParams, day: string): Promise<TransportScheduleNode> {
  const data: any = await $get({
    url: '/show/transportScheduleNode',
    params: { ...basicParams, day },
  })
  return data;
}
/**
 * 运输任务进度跟踪
 * @param basicParams
 * @param startDay 
 * @param endDay 
 */
export const getTransportNodeList = async function (basicParams: BasicParams, startDay: string, endDay: string): Promise<TransportNodeList> {
  const data: any = await $get({
    url: '/show/transportNodeList',
    params: { ...basicParams, startDay, endDay },
  })
  return data;
}
/**
 * 订单交付时长分布(已废弃)
 * @param basicParams
 * @param endDay 
 */
export const getTransportDeliver = async function (basicParams: BasicParams, endDay: string): Promise<TransportDeliver> {
  const data: any = await $get({
    url: '/show/transportDeliver',
    params: { ...basicParams, day: endDay },
  })
  return data;
}
/**
 * SKU分类当月库存周转率
 * @param basicParams 
 * @param month 
 */
export const getSkuTurnoverRate = async function (basicParams: BasicParams, month: string): Promise<SkuTurnoverRate> {
  const formatMonth = month.split('-').join('');
  const data: any = await $get({
    url: '/show/skuTurnoverRate',
    params: { ...basicParams, month: formatMonth },
  })
  return data;
}
/**
 * 人均效率
 * @param basicParams 
 * @param startTwoWeeks 
 * @param endDay 
 */
export const getPersonRate = async function (basicParams: BasicParams, startTwoWeeks: string, endDay: string): Promise<PersonRate[]> {
  const data: any = await $get({
    url: '/show/personRate',
    params: { ...basicParams, startDay: startTwoWeeks, endDay },
  })
  return data;
}
/**
 * 发货量TopN
 * @param basicParams 
 * @param day 
 * @param num 
 */
export const getSendTopN =
  async function (basicParams: BasicParams, day: string, num: number): Promise<TopN[]> {
  const data: any = await $get({
    url: '/show/sendTopN',
    params: { ...basicParams, day, num },
  })
  return data;
}
/**
 * 收货量TopN
 * @param basicParams 
 * @param day 
 * @param num 
 * @param dimType
 */
export enum DimType { //维度
  日维度,
  月维度,
}
export const getReceiveTopN =
  async function (basicParams: BasicParams, day: string, num: number, dimType: DimType): Promise<TopN[]> {
  const data: any = await $get({
    url: '/show/receiveTopN',
    params: { ...basicParams, day, num, dimType },
  })
  return data;
}
/**
 * 运输任务发货到货及时率(废弃)
 * @param basicParams 
 * @param startTwoWeeks 
 * @param endDay 
 */
export const getTransportTimelyRate = async function(basicParams: BasicParams, startTwoWeeks: string, endDay: string): Promise<TransportTimelyRate[]> {
  const data: any = await $get({
    url: '/show/transportTimelyRate',
    params: { ...basicParams, startDay: startTwoWeeks, endDay },
  })
  return data;
}
/**
 * 货损货差PPM(原)
 * @param basicParams 
 * @param startDay 
 * @param endDay 
 */
export const getTransportPpm = async function(basicParams: BasicParams, startDay: string, endDay: string): Promise<TransportPpm[]> {
  const data: any = await $get({
    url: '/show/transportPpm',
    params: { ...basicParams, startDay, endDay },
  })
  return data;
}

/**
 * 货差PPM(配页面)
 * @param basicParams 
 * @param startMonth 
 * @param endMonth 
 */
export const getTransportPpmTrans = async function(basicParams: BasicParams, startMonth: string, endMonth: string): Promise<TransportPpmTrans[]> {
  const formatStartMonth = startMonth.split('-').join('');
  const formatEndMonth = endMonth.split('-').join('');
  const data: any = await $get({
    url: '/show/transportPpm',
    params: { ...basicParams, startMonth: formatStartMonth, endMonth: formatEndMonth },
  })
  return data;
}

/**
 * 订单单流向
 * @param basicParams 
 * @param day
 * @param dimType
 */
export const getOrderFlow = async function (basicParams: BasicParams, day: string, dimType: DimType): Promise<OrderFlowList> {
  const data: any = await $get({
    url: '/show/orderFlow',
    params: { ...basicParams, day, dimType },
  })
  return data;
}

/**
 * 订单交付时长分布
 * @param basicParams
 * @param endDay 
 */
export const getTransportSend = async function (basicParams: BasicParams, endDay: string): Promise<TransportSend> {
  const data: any = await $get({
    url: '/show/transportDeliver',
    params: { ...basicParams, day: endDay },
  })
  return data;
}

/**
 * 订单延误时长分布
 * @param basicParams 
 * @param endDay 
 */
export const getTransportDelay = async function (basicParams: BasicParams, endDay: string): Promise<TransportDelay> {
  const data: any = await $get({
    url: '/show/transportDelay',
    params: { ...basicParams, day: endDay },
  })
  return data;
}
/**
 * 运输到货及时率
 * @param basicParams 
 * @param startTwoWeeks 
 * @param endDay 
 */
export const getTransportTimelyReceiveRate = async function(basicParams: BasicParams, startTwoWeeks: string, endDay: string): Promise<TransportTimelyReceiveRate[]> {
  const data: any = await $get({
    url: '/show/transportTimelyRate',
    params: { ...basicParams, startDay: startTwoWeeks, endDay },
  })
  return data;
}