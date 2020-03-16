import { graphic } from 'echarts';
import {
  OrderScheduleNode,
  OrderScheduleNodeItem, // 1
  OrderNodeList,
  OrderNodeListItem, // 2
  TurnoverRate,
  TurnoverRateItem, // 3
  AccuracyRate,
  AccuracyRateItem, // 4
  LowStockRate,
  LowStockRateItem, // 5
  LocatorRate,
  LocatorRateItem, // 6
  TimelyRate,
  TimelyRateItem, // 7
  SkuStockDis,
  SkuStockDisItem, // 8
} from '../../types';

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
    // 隐藏历史未完成
    // historyUnfinishedNum,
  } = orderScheduleNode;
  // const historyUnFinished: OrderScheduleNodeItem = {
  //   name: '历史未完成',
  //   type: 'bar',
  //   stack: '总量',
  //   label: {
  //     normal: {
  //       show: true,
  //       position: 'inside',
  //     },
  //   },
  //   itemStyle: {
  //     barBorderRadius: [0, 0, 4, 4],
  //   },
  //   barMaxWidth: 70,
  //   data: [
  //     Number(historyUnfinishedNum), 
  //     Number(historyUnfinishedNum), 
  //     Number(historyUnfinishedNum), 
  //     Number(historyUnfinishedNum), 
  //     Number(historyUnfinishedNum)
  //   ],
  // };
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
  return [finished, unfinished];
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

export const formatTurnoverRate = (turnoverRateList: TurnoverRate[]): TurnoverRateItem[] => {
  const data = turnoverRateList.map(item => item.value === '-1' ? 0 : Number(item.value));
  const series: TurnoverRateItem = {
    name: '周转率',
    type: 'bar',
    stack: null,
    label: {
      normal: {
        // formatter: '{d}',
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
      },
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
// 库存准确率
export const formatAccuracyRate = (accuracyRate: AccuracyRate[]): AccuracyRateItem[] => {
  const data = accuracyRate.map(
    item => Number(item.value) === -1 ? 100
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
