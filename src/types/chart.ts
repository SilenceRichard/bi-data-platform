interface HistogramNodeItem {
  name: string,
  type: 'bar',
  stack: null | string,
  label: {
    normal: {
      show: boolean,
      position: string,
      formatter?: any,
    }
  },
  itemStyle?: object,
  barMaxWidth?: string | number,
  barMinWidth?: string | number,
  data: Array<number>,
} // 柱状图 series 常用配置项

interface PolineItem {
  name: string,
  type: 'line',
  stack: null | string,
  data: Array<number>,
  yAxisIndex?: number,
  label: {
    normal: {
      show: boolean,
      position: string,
      formatter?: any,
    }
  },
  smooth: boolean,
  areaStyle?: object,
} // 折线图 series 常用配置项

interface PolineHistogramItem {
  name: string,
  type: 'bar' | 'line',
  data: Array<number>,
  label: {
    normal: {
      show: boolean,
      position: string,
      formatter?: any,
    }
  },
  smooth?: boolean,
  barMaxWidth?: number,
  itemStyle?: object,
  areaStyle?: object,
  yAxisIndex?: number,
}

// 订单流向
export interface OrderFlow {
  fromCity: string,
  toCity: string,
  fromCityName: string,
  fromCityLng: number,
  fromCityLat: number,
  toCityName: string,
  toCityLng: number,
  toCityLat: number,
  num: string,
}

export type OrderFlowList = OrderFlow[];

export interface ChartProps {
  title: string,
  color?: Array<string>,
  legend?: Array<string>,
  xItems?: Array<string>,
  series?: any,
  vertical?: boolean,
  startColor?: string,
  endColor?: string,
  orderFlowList?: OrderFlowList,
}

export interface OrderScheduleNodeItem  extends HistogramNodeItem {} // 仓储全流程监控：当前实时任务进度 图表展示项

export interface TransportScheduleNodeItem extends HistogramNodeItem {} // 运输全流程监控：当前实时任务进度 图表展示项

export interface SkuTurnoverRateItem extends HistogramNodeItem{} // SKU分类当月库存周转率

export interface OrderNodeListItem extends HistogramNodeItem {} // 仓储任务进度跟踪

export interface TransportNodeListItem extends HistogramNodeItem {} // 运输任务进度跟踪

export interface TransportDeliverItem extends HistogramNodeItem {} // 订单交付/延误时长分布

export interface TurnoverRateItem extends HistogramNodeItem {} // 库存周转率

export interface PersonRateItem extends HistogramNodeItem {} // 仓库人均效率

export interface AccuracyRateItem extends PolineItem {} // 库存准确率

export interface LowStockRateItem extends PolineItem {} // 库存低储率

export interface LocatorRateItem extends PolineItem {} // 库位使用率

export interface TransportTimelyRateItem extends PolineItem {} // 运输任务发货到货及时率

export interface TimelyRateItem extends PolineHistogramItem {} // 仓储任务发运及时率

export interface TransportPpmItem extends PolineHistogramItem {} // 货差货损PPM

export interface SkuStockDisItem extends HistogramNodeItem {} // 各类sku天数分布

export interface TransportPpmTransItem extends PolineItem {} // (配) 货差货损PPM

export interface TransportSendItem extends HistogramNodeItem {} // 订单交付时长分布

export interface TransportDelayItem extends HistogramNodeItem {} // 订单延误时长分布

export interface TransportTimelyReceiveRateItem extends PolineItem {} // 运输任务到货及时率