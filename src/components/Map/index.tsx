import React from 'react';
import ReactEcharts from "echarts-for-react";
import 'echarts/map/js/china';
import { ChartProps, OrderFlowList } from 'src/types';

const geoCoord = {
  北京: [116.4551, 40.2539],
  天津: [117.4219, 39.4189],
  河北: [114.4995, 38.1006],
  山西: [112.3352, 37.9413],
  内蒙: [110.3467, 41.4899],
  辽宁: [123.1238, 42.1216],
  吉林: [125.8154, 44.2584],
  黑龙: [127.9688, 45.368],
  上海: [121.4648, 31.2891],
  江苏: [118.8062, 31.9208],
  浙江: [119.5313, 29.8773],
  安徽: [117.29, 32.0581],
  福建: [119.4543, 25.9222],
  江西: [116.0046, 28.6633],
  山东: [117.1582, 36.8701],
  河南: [113.4668, 34.6234],
  湖北: [114.3896, 30.6628],
  湖南: [113.0823, 28.2568],
  广东: [113.12244, 23.009505],
  广西: [108.479, 23.1152],
  海南: [110.3893, 19.8516],
  重庆: [108.384366, 30.439702],
  四川: [103.9526, 30.7617],
  贵州: [106.6992, 26.7682],
  云南: [102.9199, 25.4663],
  西藏: [91.11, 29.97],
  陕西: [109.1162, 34.2004],
  甘肃: [103.5901, 36.3043],
  青海: [101.4038, 36.8207],
  宁夏: [106.3586, 38.1775],
  新疆: [87.9236, 43.5883],
  香港: [114.173, 22.32],
  澳门: [113.549, 22.198],
  台湾: [121.509, 25.044],
};

const PathMap = (props: ChartProps) => {
  const { title, orderFlowList = [] } = props;
  let max = 0;
  const fromPointsName:string[] = [];
  const fromPoints:OrderFlowList = [];
  let list: OrderFlowList = [];
  orderFlowList.forEach(orderFlow => {
    if (!orderFlow) return;
    if (orderFlow.fromCityLng && orderFlow.fromCityLat && orderFlow.toCityLng && orderFlow.toCityLat) {
      list.push(orderFlow);
    } else {
      if (orderFlow.fromCityName && geoCoord[orderFlow.fromCityName.substring(0, 2)]) {
        const [lng, lat] = geoCoord[orderFlow.fromCityName.substring(0, 2)];
        orderFlow.fromCityLng = lng;
        orderFlow.fromCityLat = lat;
      } else if (orderFlow.fromCity && geoCoord[orderFlow.fromCity.substring(0, 2)]) {
        const [lng, lat] = geoCoord[orderFlow.fromCity.substring(0, 2)];
        orderFlow.fromCityName = orderFlow.fromCity;
        orderFlow.fromCityLng = lng;
        orderFlow.fromCityLat = lat;
      } else {
        return;
      }
      if (orderFlow.toCityName && geoCoord[orderFlow.toCityName.substring(0, 2)]) {
        const [lng, lat] = geoCoord[orderFlow.toCityName.substring(0, 2)];
        orderFlow.toCityLng = lng;
        orderFlow.toCityLat = lat;
      } else if (orderFlow.toCity && geoCoord[orderFlow.toCity.substring(0, 2)]) {
        const [lng, lat] = geoCoord[orderFlow.toCity.substring(0, 2)];
        orderFlow.toCityName = orderFlow.toCity;
        orderFlow.toCityLng = lng;
        orderFlow.toCityLat = lat;
      } else {
        return;
      }
      list.push(orderFlow);
    }
  });
  list.forEach(orderFlow => {
    if (!fromPointsName.includes(orderFlow.fromCityName)) {
      fromPoints.push(orderFlow);
      fromPointsName.push(orderFlow.fromCityName);
    }
  });
  list.forEach(orderFlow => {
    const value = Math.ceil(parseFloat(orderFlow.num));
    if (value > max) {
      max = value;
    }
  });
  if (max === 0) max = 1;
  const option = {
    animation: false,
    title: {
      text: title,
      padding: 24,
      textStyle: {
        color: '#E6EAFF'
      },
    },
    // backgroundColor: "#071332",
    visualMap: {
      min: 0,
      max,
      calculable: true,
      color: ["#ff3333", "orange", "yellow", "lime", "aqua"],
      textStyle: {
        color: "#fff"
      },
      show: list.length > 0
    },
    geo: {
      map: "china",
      // zoom: 1.2,
      roam: false,
      silent: false,
      label: {
        emphasis: {
          show: false
        }
      },
      itemStyle: {
        normal: {
          color: "#1b1b1b",
          borderColor: "rgba(100,149,237,1)",
          borderWidth: 0.5
        },
        emphasis: {
          color: "rgba(37, 43, 61, .5)",
        }
      }
    },
    series: [
      {
        type: "lines",
        zlevel: 2,
        effect: {
          show: true,
          period: 4,
          trailLength: 0.1,
          symbolSize: 3,
          color: "#fff",
          symbol: "arrow",
        },
        lineStyle: {
          normal: {
            width: 0.5,
            opacity: 0.5,
            curveness: 0.3
          }
        },
        data: list.map(orderFlow => [
          { coord: [orderFlow.fromCityLng, orderFlow.fromCityLat], value: orderFlow.num },
          { coord: [orderFlow.toCityLng, orderFlow.toCityLat] },
        ]),
        animation: false,
      },
      {
        type: "effectScatter",
        coordinateSystem: "geo",
        zlevel: 2,
        rippleEffect: {
          period: 4,
          brushType: "stroke",
          scale: 4
        },
        symbol: "circle",
        symbolSize: (value: any) => {
          return 3 + parseFloat(value[2])/max * 12;
        },
        label: {
          normal: {
            show: true,
            position: "top",
            formatter: function(params:any) {
              return params.data.name;
            },
            fontSize: 13
          },
          animation: false,
        },
        data: list.map(orderFlow => ({
          name: orderFlow.toCityName,
          value: [orderFlow.toCityLng, orderFlow.toCityLat, orderFlow.num],
        })),
      },
      {
        type: "scatter",
        coordinateSystem: "geo",
        zlevel: 2,
        symbol: "pin",
        symbolSize: 25,
        silent: true,
        data: fromPoints.map(orderFlow => ({
          name: orderFlow.fromCityName,
          value: [orderFlow.fromCityLng, orderFlow.fromCityLat, max],
        })),
        animation: false,
      },
    ],
  };
  return <ReactEcharts option={option} style={{ height: '100%' }} />;
};

export { PathMap };
