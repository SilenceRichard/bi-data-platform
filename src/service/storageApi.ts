import { $get } from '../utils/http';
import { 
  BasicParams, 
  OrderScheduleNode, 
  OrderNodeList,
  TurnoverRate,
  AccuracyRate,
  LowStockRate,
  LocatorRate,
  TimelyRate,
  SkuStockDis,
} from '../types';

/**
 * 仓库全流程监控：当日实时任务进度 
 * @param basicParams 
 * @param day 
 */
export const getOrderScheduleNode = async function (basicParams: BasicParams, day: string): Promise<OrderScheduleNode> {
  const data: any = await $get({
    url: '/show/orderScheduleNode',
    params: { ...basicParams, day },
  })
  return data;
}

/**
 * 仓储任务进度跟踪
 * @param basicParams 
 * @param startDay 
 * @param endDay 
 */
export const getOrderNodeList = async function (basicParams: BasicParams, startDay: string, endDay: string): Promise<OrderNodeList> {
  const data: any = await $get({
    url: '/show/orderNodeList',
    params: { ...basicParams, startDay, endDay },
  })
  return data;
}

/**
 * 库存周转率
 * @param basicParams 
 * @param startMonth 
 * @param endMonth 
 */
export const getTurnoverRateList = async function (basicParams: BasicParams, startMonth: string, endMonth: string): Promise<TurnoverRate[]> {
  const formatStartMonth = startMonth.split('-').join('');
  const formatEndMonth = endMonth.split('-').join('');
  const data: any = await $get({
    url: '/show/turnoverRate',
    params: { ...basicParams, startMonth: formatStartMonth, endMonth: formatEndMonth },
  })
  return data;
}

/**
 * 库存准确率
 * @param basicParams 
 * @param startTwoWeeks 
 * @param endDay 
 */
export const getAccuracyRate = async function(basicParams: BasicParams, startTwoWeeks: string, endDay: string): Promise<AccuracyRate[]> {
  const data: any = await $get({
    url: '/show/accuracyRate',
    params: { ...basicParams, startDay: startTwoWeeks, endDay },
  })
  return data;
}

/**
 * 库存低储率
 * @param basicParams 
 * @param startTwoWeeks 
 * @param endDay 
 */
export const getLowStockRate = async function(basicParams: BasicParams, startTwoWeeks: string, endDay: string): Promise<LowStockRate[]> {
  const data: any = await $get({
    url: '/show/lowStockRate',
    params: { ...basicParams, startDay: startTwoWeeks, endDay },
  })
  return data;
}

/**
 * 库位使用率
 * @param basicParams 
 * @param startTwoWeeks 
 * @param endDay 
 */
export const getLocatorRate = async function(basicParams: BasicParams, startTwoWeeks: string, endDay: string): Promise<LocatorRate[]> {
  const data: any = await $get({
    url: '/show/locatorRate',
    params: { ...basicParams, startDay: startTwoWeeks, endDay },
  })
  return data;
}

/**
 * 仓储任务发运及时率
 * @param basicParams 
 * @param startTwoWeeks 
 * @param endDay 
 */
export const getTimelyRate = async function(basicParams: BasicParams, startTwoWeeks: string, endDay: string): Promise<TimelyRate[]> {
  const data: any = await $get({
    url: '/show/timelyRate',
    params: { ...basicParams, startDay: startTwoWeeks, endDay },
  })
  return data;
}

/**
 * 各类SKU库存天数分布
 * @param basicParams 
 * @param endDay 
 */
export const getSkuStockDis = async function(basicParams: BasicParams, endDay: string): Promise<SkuStockDis[]> {
  const data: any = await $get({
    url: '/show/skuStockDis',
    params: { ...basicParams, day: endDay },
  })
  return data;
}

