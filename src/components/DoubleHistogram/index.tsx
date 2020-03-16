import React from "react";
import ReactEcharts from "echarts-for-react";

import { ChartProps } from '../../types';

const DoubleHistogram = (props: ChartProps) => {
  const { title, color, legend, series, xItems } = props;
  const formatXItems = xItems ?
    xItems.map((item) => (
      {
        value: item,
        textStyle: {
          color: '#E6EAFF',
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
    color,
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: legend,
      top: 10,
      right: 10,
      orient: 'vertical',
      textStyle: {
        color: '#E6EAFF',
        // fontSize: 16
      }
    },
    calculable: true,
    xAxis: {
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
    },
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
        },
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

export { DoubleHistogram };
