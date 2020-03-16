import React from "react";
import ReactEcharts from "echarts-for-react";
// import {graphic} from 'echarts';

import { ChartProps } from '../../types';

const PolylineHistogram= (props: ChartProps) => {
  const { title, series=[], xItems=[], legend=[], color=[] } = props;
  const option = {
    title: {
      text: title,
      padding: 18,
      textStyle: {
        color: '#E6EAFF'
      }
    },
    color,
    textStyle: {
      color: '#E6EAFF'
    },
    // color: new graphic.LinearGradient(
    //   0, 0, 0, 1,
    //   [
    //     { offset: 0, color: '#00A7FC' },
    //     { offset: 1, color: '#064AD7' }
    //   ]
    // ),
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        crossStyle: {
          color: '#999'
        }
      }
    },
    legend: {
      data: legend,
      top: 12,
      right: 10,
      orient: 'vertical',
      textStyle: {
        color: '#E6EAFF',
        // fontSize: 16
      }
    },
    xAxis: [
      {
        type: 'category',
        data: xItems,
        axisPointer: {
          type: 'shadow'
        },
        nameLocation: 'end',//坐标轴名称显示位置。
        axisLabel: {//坐标轴刻度标签的相关设置。
          interval: 0,
          rotate: "45"
        },
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: false,
        }
      }
    ],
    yAxis: [
      {
        type: 'value',
        min: 0,
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: false,
        }
      },
      {
        type: 'value',
        min: 0,
        max: 100,
        interval: 20,
        axisLabel: {
          formatter: '{value}%'
        },
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: false,
        }
      }
    ],
    series,
  };
  return (
    <ReactEcharts
      option={option}
      notMerge={true}
      lazyUpdate={true}
      theme={"theme_name"}
    />
  );
};

export { PolylineHistogram };
