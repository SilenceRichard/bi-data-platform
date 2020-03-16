import { graphic } from 'echarts';
import {
  TopN,
  TopNItem,
  TransportScheduleNode,
  TransportScheduleNodeItem,
  TransportNodeList,
  TransportNodeListItem,
  OrderNodeListItem,
  TransportSend,
  TransportSendItem,
  TransportDelay,
  TransportDelayItem,
  TransportPpmTrans,
  TransportPpmTransItem,
  TransportTimelyReceiveRate,
  TransportTimelyReceiveRateItem,
} from '../../types';

export const formatTopN = (topNList: TopN[]): TopNItem => {
  const data: TopNItem = topNList
    .sort((a, b) => Number(a.value) - Number(b.value))
    .map((item) => [Number(item.value), item.name]);
  data.unshift(['amount', 'name']);
  return data;
}

export const formatTransportScheduleNode = (transportScheduleNode: TransportScheduleNode): TransportScheduleNodeItem[] => {
  for (let key in transportScheduleNode) {
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

export const formatTransportSend = (transportSend: TransportSend): TransportSendItem[] => {
  const finishedNum = Object.keys(transportSend).map(key => transportSend[key] === '-1' ? 0 : Number(transportSend[key]));
  const series: TransportSendItem = {
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
  return [series];
}

export const formatTransportDelay = (transportDelay: TransportDelay): TransportDelayItem[] => {
  const unfinishedNum = Object.keys(transportDelay).map(key => transportDelay[key] === '-1' ? 0 : Number(transportDelay[key]));
  const series: TransportDelayItem = {
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
  return [series];
}

export const formatTransportPpmTrans = (transportPpm: TransportPpmTrans[]): TransportPpmTransItem[] => {
  const data = transportPpm.map(item => Number(item.value) === -1 ? 0
    : Number((Number(item.value) * 100).toFixed(2))
  );
  const series: TransportPpmTransItem = {
    name: '货损率',
    type: 'line',
    stack: null,
    data,
    label: {
      normal: {
        formatter: '{@货损率}%',
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

export const formatTransportTimelyReceiveRate = (locatorRate: TransportTimelyReceiveRate[]): TransportTimelyReceiveRateItem[] => {
  const data = locatorRate.map(item => Number(item.receive) === -1 ? 100
    : Number((Number(item.receive) * 100).toFixed(2))
  );
  const series: TransportTimelyReceiveRateItem = {
    name: '运输到货及时率',
    type: 'line',
    stack: null,
    data,
    label: {
      normal: {
        formatter: '{@运输到货及时率}%',
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