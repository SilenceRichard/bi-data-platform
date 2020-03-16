import React from "react";
import ReactEcharts from "echarts-for-react";

import { ChartProps } from '../../types';

const Polyline = (props: ChartProps) => {
  const { title, series = [], xItems = [], color = [], legend = [] } = props;
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
    color,
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      show: true,
      data: legend,
      top: 12,
      right: 10,
      textStyle: {
        color: '#E6EAFF',
        // fontSize: 16
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: xItems,
      nameLocation: 'end',//坐标轴名称显示位置。
      axisLabel: {//坐标轴刻度标签的相关设置。
        interval: 0,
        rotate: "45"
      },
    },
    yAxis: {
      type: 'value',
      min: 0,
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
    },
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

export { Polyline };
