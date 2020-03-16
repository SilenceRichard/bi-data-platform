
// 运输全流程监控：当前实时任务进度
export interface TransportScheduleNode {
  unreceive: string,
  receive: string,
  incomplete: string,
  split: string,
  doneTransit: string,
  inTransit: string,
  pending: string,
  historyIncomplete: string,
  complete: string
}

// SKU分类当月库存周转率

interface SkuTurnoverRateChild {
  name: string,
  value: string,
}

export type SkuTurnoverRate = SkuTurnoverRateChild[];

// 运输任务进度跟踪
interface TransportNode {
  finished: string,
  unfinish: string,
  day: string,
}

export type TransportNodeList = Array<TransportNode>

// 订单交付/延误时长分布 (已废弃)
export interface TransportDeliver {
  deliver: object,
  delay: object,
}

// 仓库人均效率
export interface PersonRate {
  name: string,
  value: string,
}

// 发货量TopN - 收货量TopN
export interface TopN {
  name: string,
  value: string,
}

export type TopNItem = Array<Array<string | number>>

// 运输任务发货到货及时率
export interface TransportTimelyRate {
  receive: string, // 到货及时率
  send: string, // 发货及时率
  day: string,
}

// 货差货损PPM
export interface TransportPpm {
  day: string,
  num: string,
  rate: string,
}

// 运输任务到货及时率
export interface TransportTimelyReceiveRate {
  receive: string, // 到货及时率
  day: string,
}

// 订单交付时长分布
export interface TransportSend {
  [key: string] : string
}

// 订单延误时长分布
export interface TransportDelay {
  [key: string] : string
}

// (配)货损货差PPM
export interface TransportPpmTrans {
  name: string,
  value: string,
}