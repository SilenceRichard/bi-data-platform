import { graphic } from 'echarts';
import {
  OrderScheduleNode,
  OrderScheduleNodeItem,
  TransportScheduleNode,
  TransportScheduleNodeItem,
  OrderNodeList,
  OrderNodeListItem,
  TransportNodeList,
  TransportNodeListItem,
  TransportDeliver,
  TransportDeliverItem,
  TurnoverRate,
  TurnoverRateItem,
  SkuTurnoverRate,
  SkuTurnoverRateItem,
  PersonRate,
  PersonRateItem,
  TopN,
  TopNItem,
  AccuracyRate,
  AccuracyRateItem,
  LowStockRate,
  LowStockRateItem,
  LocatorRate,
  LocatorRateItem,
  TransportTimelyRate,
  TransportTimelyRateItem,
  TimelyRate,
  TimelyRateItem,
  TransportPpm,
  TransportPpmItem,
  SkuStockDis,
  SkuStockDisItem,
} from '../../../types';

export const formatOrderScheduleNode = (orderScheduleNode: OrderScheduleNode): OrderScheduleNodeItem[] => {
  for  (let key in orderScheduleNode) {
    if (orderScheduleNode[key] === '-1') {
      orderScheduleNode[key] = '0'
    }
  }
  const {
    receiveNum,
    waveNum,  
    pickNum,
    checkNum,
    shippNum,
    receiveUnfinishedNum,
    waveUnfinishedNum,
    pickUnfinishedNum,
    checkUnfinishedNum,
    shippUnfinishedNum,
    historyUnfinishedNum,
  } = orderScheduleNode;
  const historyUnFinished: OrderScheduleNodeItem = {
    name: '历史未完成',
    type: 'bar',
    stack: '总量',
    label: {
      normal: {
        show: true,
        position: 'inside',
      }
    },
    itemStyle: {
      barBorderRadius: [0, 0, 4, 4],
    },
    barMaxWidth: 70,
    data: [
      Number(historyUnfinishedNum), 
      Number(historyUnfinishedNum), 
      Number(historyUnfinishedNum), 
      Number(historyUnfinishedNum), 
      Number(historyUnfinishedNum)
    ],
  };
  const finished: OrderScheduleNodeItem = {
    name: '今日已完成',
    type: 'bar',
    stack: '总量',
    label: {
      normal: {
        show: true,
        position: 'inside',
      }
    },
    barMaxWidth: 70,
    data: [Number(receiveNum), Number(waveNum), Number(pickNum), Number(checkNum), Number(shippNum)],
  };
  const unfinished: OrderScheduleNodeItem = {
    name: '今日未完成',
    type: 'bar',
    stack: '总量',
    label: {
      normal: {
        show: true,
        position: 'inside',
      }
    },
    itemStyle: {
      barBorderRadius: [4, 4, 0, 0],
    },
    barMaxWidth: 70,
    data: [Number(receiveUnfinishedNum), Number(waveUnfinishedNum), Number(pickUnfinishedNum), Number(checkUnfinishedNum), Number(shippUnfinishedNum)],
  };
  return [historyUnFinished, finished, unfinished];
}

export const formatTransportScheduleNode = (transportScheduleNode: TransportScheduleNode): TransportScheduleNodeItem[] => {
  for  (let key in transportScheduleNode) {
    if (transportScheduleNode[key] === '-1') {
      transportScheduleNode[key] = '0'
    }
  }
  const {
    receive, // 接单已完成
    split, // 拆分已完成
    doneTransit, // 运输已完成
    unreceive,
    pending,
    inTransit,
    historyIncomplete, // 历史未完成
    complete,
    incomplete,
  } = transportScheduleNode;
  const historyUnFinished: TransportScheduleNodeItem = {
    name: '历史未完成',
    type: 'bar',
    stack: '总量',
    label: {
      normal: {
        show: true,
        position: 'inside',
      }
    },
    itemStyle: {
      barBorderRadius: [0, 0, 4, 4],
    },
    barMaxWidth: 16,
    data: [Number(historyIncomplete), Number(historyIncomplete), Number(historyIncomplete), Number(historyIncomplete)],
  };
  const finished: TransportScheduleNodeItem = {
    name: '今日已完成',
    type: 'bar',
    stack: '总量',
    label: {
      normal: {
        show: true,
        position: 'inside',
      }
    },
    barMaxWidth: 16,
    data: [Number(receive), Number(split), Number(doneTransit), Number(complete)],
  };
  const unfinished: TransportScheduleNodeItem = {
    name: '今日未完成',
    type: 'bar',
    stack: '总量',
    label: {
      normal: {
        show: true,
        position: 'inside',
      }
    },
    itemStyle: {
      barBorderRadius: [4, 4, 0, 0],
    },
    barMaxWidth: 70,
    data: [Number(unreceive), Number(pending), Number(inTransit), Number(incomplete)],
  }
  return [historyUnFinished, finished, unfinished];
}

export const formatOrderNodeList = (orderNodeList: OrderNodeList): OrderNodeListItem[] => {
  const finishedNum = orderNodeList.map(item => item.finishedNum === '-1' ? 0 : Number(item.finishedNum));
  const unfinishedNum = orderNodeList.map(item => item.unfinishedNum === '-1' ? 0 : Number(item.unfinishedNum));
  const finished: OrderNodeListItem = {
    name: '已完成订单',
    type: 'bar',
    stack: null,
    label: {
      normal: {
        show: true,
        position: 'top',
      }
    },
    itemStyle: {
      barBorderRadius: [4, 4, 0, 0],
    },
    data: finishedNum,
  };
  const unfinished: OrderNodeListItem = {
    name: '未完成订单',
    type: 'bar',
    stack: null,
    label: {
      normal: {
        show: true,
        position: 'top',
      }
    },
    itemStyle: {
      barBorderRadius: [4, 4, 0, 0],
    },
    data: unfinishedNum,
  };
  return [finished, unfinished];
}

export const formatTransportNodeList = (transportNodeList: TransportNodeList): TransportNodeListItem[] => {
  const finishedNum = transportNodeList.map(item => item.finished === '-1' ? 0 : Number(item.finished));
  const unfinishedNum = transportNodeList.map(item => item.unfinish === '-1' ? 0 : Number(item.unfinish));
  const finished: OrderNodeListItem = {
    name: '已完成订单',
    type: 'bar',
    stack: null,
    label: {
      normal: {
        show: true,
        position: 'top',
      }
    },
    barMaxWidth: 16,
    itemStyle: {
      barBorderRadius: [4, 4, 0, 0],
    },
    data: finishedNum,
  };
  const unfinished: OrderNodeListItem = {
    name: '未完成订单',
    type: 'bar',
    barMaxWidth: 16,
    stack: null,
    label: {
      normal: {
        show: true,
        position: 'top',
      }
    },
    itemStyle: {
      barBorderRadius: [4, 4, 0, 0],
    },
    data: unfinishedNum,
  };
  return [finished, unfinished];
}

export const formatTransportDeliver = (transportDeliver: TransportDeliver): TransportDeliverItem[] => {
  const { delay, deliver } = transportDeliver;
  const finishedNum = Object.keys(deliver).map(key => deliver[key] === '-1' ? 0 : Number(deliver[key]));
  const unfinishedNum = Object.keys(delay).map(key => delay[key] === '-1' ? 0 : Number(delay[key]));
  const finished: TransportDeliverItem = {
    name: '交付',
    type: 'bar',
    stack: null,
    label: {
      normal: {
        show: true,
        position: 'top',
      }
    },
    barMaxWidth: 16,
    itemStyle: {
      barBorderRadius: [4, 4, 0, 0],
    },
    data: finishedNum,
  };
  const unfinished: TransportDeliverItem = {
    name: '延误',
    type: 'bar',
    stack: null,
    label: {
      normal: {
        show: true,
        position: 'top',
      }
    },
    barMaxWidth: 16,
    itemStyle: {
      barBorderRadius: [4, 4, 0, 0],
    },
    data: unfinishedNum,
  };
  return [finished, unfinished];
}

export const formatTurnoverRate = (turnoverRateList: TurnoverRate[]): TurnoverRateItem[] => {
  const data = turnoverRateList.map(item => item.value === '-1' ? 0 : Number(item.value));
  const series: TurnoverRateItem = {
    name: '周转率',
    type: 'bar',
    stack: null,
    label: {
      normal: {
        show: true,
        position: 'top',
      }
    },
    barMaxWidth: 16,
    itemStyle: {
      barBorderRadius: [4, 4, 0, 0],
    },
    data,
  }
  return [series];
}

export const formatSkuTurnoverRate = (skuTurnoverRate: SkuTurnoverRate): SkuTurnoverRateItem[] => {
  const data = skuTurnoverRate.map(item => Number(item.value));
  const series: SkuTurnoverRateItem = {
    name: '周转率',
    type: 'bar',
    stack: null,
    label: {
      normal: {
        show: true,
        position: 'top',
      }
    },
    itemStyle: {
      barBorderRadius: [4, 4, 0 ,0],
    },
    barMaxWidth: 16,
    data,
  }
  return [series];
}

export const formatPersonRate = (personRate: PersonRate[]): PersonRateItem[] => {
  const data = personRate.map(item => item.value === '-1' ? 0 : Number(item.value));
  const series: PersonRateItem = {
    name: '人均效率',
    type: 'bar',
    stack: null,
    label: {
      normal: {
        show: true,
        position: 'top',
      }
    },
    itemStyle: {
      barBorderRadius: [4, 4, 0 ,0],
    },
    barMaxWidth: 16,
    data,
  }
  return [series];
}

export const formatSkuStockDis = (skuStockDis: SkuStockDis[]): SkuStockDisItem[] => {
  const sku0_30: number[] = [];
  const sku31_60: number[] = [];
  const sku61_90: number[] = [];
  const sku91_120: number[] = [];
  const skuOver120: number[] = [];
  skuStockDis.forEach(item => {
    sku0_30.push(item['0-30'] === '-1' ? 0 : Number(item['0-30']));
    sku31_60.push(item['31-60'] === '-1' ? 0 : Number(item['31-60']));
    sku61_90.push(item['61-90'] === '-1' ? 0 : Number(item['61-90']));
    sku91_120.push(item['91-120'] === '-1' ? 0 : Number(item['91-120']));
    skuOver120.push(item['>120'] === '-1' ? 0 : Number(item['>120']));
  });
  const sku1: SkuStockDisItem = {
    name: '0-30天',
    type: 'bar',
    stack: '总量',
    label: {
      normal: {
        show: true,
        position: 'inside',
      }
    },
    barMaxWidth: 70,
    data: sku0_30,
  }
  const sku2: SkuStockDisItem = {
    name: '31-60天',
    type: 'bar',
    stack: '总量',
    label: {
      normal: {
        show: true,
        position: 'inside',
      }
    },
    barMaxWidth: 70,
    data: sku31_60,
  }
  const sku3: SkuStockDisItem = {
    name: '61-90天',
    type: 'bar',
    stack: '总量',
    label: {
      normal: {
        show: true,
        position: 'inside',
      }
    },
    barMaxWidth: 70,
    data: sku61_90,
  }
  const sku4: SkuStockDisItem = {
    name: '91-120天',
    type: 'bar',
    stack: '总量',
    label: {
      normal: {
        show: true,
        position: 'inside',
      }
    },
    barMaxWidth: 70,
    data: sku91_120,
  }
  const sku5: SkuStockDisItem = {
    name: '>120天',
    type: 'bar',
    stack: '总量',
    label: {
      normal: {
        show: true,
        position: 'inside',
      }
    },
    itemStyle: {
      barBorderRadius: [4, 4, 0 ,0],
    },
    barMaxWidth: 70,
    data: skuOver120,
  }
  return [sku1, sku2, sku3, sku4, sku5];
}

export const formatTopN = (topNList: TopN[]): TopNItem => {
  const data: TopNItem = topNList
    .sort((a, b) => Number(a.value) - Number(b.value))
    .map((item) => [Number(item.value), item.name]);
  data.unshift(['amount', 'name']);
  return data;
}

export const formatAccuracyRate = (accuracyRate: AccuracyRate[]): AccuracyRateItem[] => {
  const data = accuracyRate.map(
    item => item.value === '-1' ? 0 
      : Number((Number(item.value) * 100).toFixed(2))
  );
  const series: AccuracyRateItem = {
    name: '库存准确率',
    type: 'line',
    stack: '总量',
    data,
    label: {
      normal: {
        formatter: '{@库存准确率}%',
        show: true,
        position: 'top',
      }
    },
    smooth: true,
    areaStyle: {
      normal: {
        color: new graphic.LinearGradient(0, 0, 0, 1, [{
          offset: 0,
          color: '#064ad77a'
        }, {
          offset: 1,
          color: '#064ad700'
        }])
      }
    }
  };
  return [series];
}

export const formatLowStockRate = (lowStockRate: LowStockRate[]): LowStockRateItem[] => {
  const data = lowStockRate.map(
    item => item.value === '-1' ? 0 
      : Number((Number(item.value) * 100).toFixed(2))
  );
  const series: LowStockRateItem = {
    name: '库存低储率',
    type: 'line',
    stack: '总量',
    data,
    label: {
      normal: {
        formatter: '{@库存低储率}%',
        show: true,
        position: 'top',
      }
    },
    smooth: true,
    areaStyle: {
      normal: {
        color: new graphic.LinearGradient(0, 0, 0, 1, [{
          offset: 0,
          color: '#c95ff266'
        }, {
          offset: 1,
          color: '#c95ff200'
        }])
      }
    }
  };
  return [series];
}

export const formatLocatorRate = (locatorRate: LocatorRate[]): LocatorRateItem[] => {
  const data = locatorRate.map(item => item.value === '-1' ? 0 
    : Number((Number(item.value) * 100).toFixed(2))
  );
  const series: LocatorRateItem = {
    name: '库位使用率',
    type: 'line',
    stack: '总量',
    data,
    label: {
      normal: {
        formatter: '{@库位使用率}%',
        show: true,
        position: 'top',
      }
    },
    smooth: true,
    areaStyle: {
      normal: {
        color: new graphic.LinearGradient(0, 0, 0, 1, [{
          offset: 0,
          color: '#064ad77a'
        }, {
          offset: 1,
          color: '#064ad700'
        }])
      }
    }
  };
  return [series];
}

export const formatTransportTimelyRate = (transportTimelyRate: TransportTimelyRate[]): TransportTimelyRateItem[] => {
  const receiveNum = transportTimelyRate.map(item => item.receive === '-1' ?  0 :  Number((Number(item.receive) * 100).toFixed(2)));
  const sendNum = transportTimelyRate.map(item =>  item.send === '-1' ?  0 : Number((Number(item.send) * 100).toFixed(2)));
  const receive: TransportTimelyRateItem = {
    name: '到货率',
    type: 'line',
    stack: null,
    label: {
      normal: {
        formatter: '{@到货率}%',
        show: true,
        position: 'top',
      }
    },
    smooth: true,
    data: receiveNum,
    areaStyle: {
      normal: {
        color: new graphic.LinearGradient(0, 0, 0, 1, [{
          offset: 0,
          color: '#064ad77a'
        }, {
          offset: 1,
          color: '#064ad700'
        }])
      }
    }
  };
  const send: TransportTimelyRateItem = {
    name: '发货率',
    type: 'line',
    stack: null,
    data: sendNum,
    label: {
      normal: {
        formatter: '{@发货率}%',
        show: true,
        position: 'top',
      }
    },
    smooth: true,
    areaStyle: {
      normal: {
        color: new graphic.LinearGradient(0, 0, 0, 1, [{
          offset: 0,
          color: '#c95ff266'
        }, {
          offset: 1,
          color: '#c95ff200'
        }])
      }
    }
  };
  return [receive, send];
}

export const formatTimelyRate = (timelyRate: TimelyRate[]): TimelyRateItem[] => {
  const numData = timelyRate.map(item => item.num === '-1' ? 0 : Number(item.num));
  const rateData = timelyRate.map(item => item.rate === '-1' ? 0 : Number((Number(item.rate) * 100).toFixed(2)));
  const num: TimelyRateItem = {
    name: '已完成总订单量',
    type: 'bar',
    barMaxWidth: 16,
    data: numData,
    label: {
      normal: {
        show: true,
        position: 'top',
      }
    },
    itemStyle: {
      normal: {
        color: new graphic.LinearGradient(0, 0, 0, 1, [{
          offset: 0,
          color: '#00A7FC'
        }, {
          offset: 1,
          color: '#064AD7'
        }]),
        barBorderRadius: [4, 4, 0, 0],
      },
    },
  };
  const rate: TimelyRateItem = {
    name: '及时率',
    type: 'line',
    yAxisIndex: 1,
    label: {
      normal: {
        formatter: '{@及时率}%',
        show: true,
        position: 'top',
      }
    },
    smooth: true,
    areaStyle: {
      normal: {
        color: new graphic.LinearGradient(0, 0, 0, 1, [{
          offset: 0,
          color: '#064ad77a'
        }, {
          offset: 1,
          color: '#064ad700'
        }])
      }
    },
    data: rateData,
  };
  return [num, rate];
}

export const formatTransportPpm = (transportPpm: TransportPpm[]): TransportPpmItem[] => {
  const numData = transportPpm.map(item => item.num === '-1' ? 0 : Number(item.num));
  const rateData = transportPpm.map(item => item.rate === '-1' ? 0 : Number((Number(item.rate) * 100).toFixed(2)));
  const num: TransportPpmItem = {
    name: '货损量',
    type: 'bar',
    label: {
      normal: {
        show: true,
        position: 'top',
      }
    },
    barMaxWidth: 16,
    data: numData,
    itemStyle: {
      normal: {
        color: new graphic.LinearGradient(0, 0, 0, 1, [{
          offset: 0,
          color: '#14C4C9'
        }, {
          offset: 1,
          color: '#215EFF'
        }]),
        barBorderRadius: [4, 4, 0, 0],
      }
    },
  };
  const rate: TransportPpmItem = {
    name: '货损率',
    type: 'line',
    label: {
      normal: {
        show: true,
        position: 'top',
        formatter: '{@货损率}%'
      }
    },
    yAxisIndex: 1,
    data: rateData,
    smooth: true,
    areaStyle: {
      normal: {
        color: new graphic.LinearGradient(0, 0, 0, 1, [{
          offset: 0,
          color: '#14c4c966'
        }, {
          offset: 1,
          color: '#14c2c800',
        }])
      }
    },
  };
  return [num, rate];
}
