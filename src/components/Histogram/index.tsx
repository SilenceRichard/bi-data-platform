import React from "react";
import { graphic } from 'echarts';
import ReactEcharts from "echarts-for-react";

import { ChartProps } from '../../types';

const Histogram = (props: ChartProps) => {
  const { title, xItems = [], series = [], color=[] } = props;
  const formatXItems = xItems ?
    xItems.map((item) => (
      {
        value: item,
        textStyle: {
          color: '#E6EAFF',
          // fontSize: 16,
        }
      }))
    : [];
  const option = {
    title: {
      text: title,
      padding: 18,
      textStyle: {
        color: '#E6EAFF'
      }
    },
    textStyle: {
      color: '#E6EAFF'
    },
    color: color.length === 0 
    ? new graphic.LinearGradient(
        0, 0, 0, 1,
        [
          { offset: 0, color: '#00A7FC' },
          { offset: 1, color: '#064AD7' }
        ]
      )
    : color,
    tooltip: {
      trigger: 'axis',
      axisPointer: {            // 坐标轴指示器，坐标轴触发有效
        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        data: formatXItems,
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
      }
    ],
    series: series,
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

export { Histogram };
