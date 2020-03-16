// 仓储全流程监控：当前实时任务进度
export interface OrderScheduleNode {
  waveNum: string,
  pickNum: string,
  checkNum: string,
  shippNum: string,
  receiveNum: string,
  waveUnfinishedNum: string,
  checkUnfinishedNum: string,
  shippUnfinishedNum: string,
  historyUnfinishedNum: string,
  receiveUnfinishedNum: string,
  pickUnfinishedNum: string,
  finishedNum: string,
  unfinishedNum: string
}

// 仓储任务进度跟踪
interface OrderNodeListChild {
  day: string,
  finishedNum: string,
  unfinishedNum: string,
}

export type OrderNodeList = OrderNodeListChild[];

// 仓储任务发运及时率
export interface TimelyRate {
  day: string,
  num: string,
  rate: string,
}

// 库存低储率
export interface LowStockRate {
  name: string,
  value:string,
}

// 库存周转率
export interface TurnoverRate {
  name: string,
  value: string,
}

// 各类SKU库存天数分布
export interface SkuStockDis {
  classify: string,
  '0-30': string,
  '31-60': string,
  '61-90': string,
  '91-120': string,
  '>120': string,
}

// 库存准确率
export interface AccuracyRate {
  name: string,
  value: string,
}

// 库位使用率
export interface LocatorRate {
  name: string,
  value: string,
}