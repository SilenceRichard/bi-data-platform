import React from "react";
import { EChartOption } from 'echarts';
import ReactEcharts from "echarts-for-react";

import { ChartProps } from '../../types';

const StackedHistogram = (props: ChartProps) => {
  const {
    title,
    color,
    legend,
    xItems,
    series,
    vertical=true,
  } = props;
  // series.map((n: { barMinHeight: number; }) =>{ // 限制最小高度
  //   n.barMinHeight = 8
  // })
  
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
  const option: EChartOption = {
    title: {
      text: title,
      padding: 18,
      textStyle: {
        color: '#E6EAFF'
      }
    },
    color,
    tooltip: {
      trigger: 'axis',
      axisPointer: {            // 坐标轴指示器，坐标轴触发有效
        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    legend: {
      data: legend,
      orient: vertical ? 'vertical' : 'horizontal',
      top: 20,
      right: 24,
      textStyle: {
        color: '#E6EAFF',
        // fontSize: 12
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    textStyle: {
      color: '#E6EAFF',
    },
    yAxis: {
      type: 'value',
      min: 0,
      data: [{
        textStyle: {
          color: '#E6EAFF',
          fontSize: 20,
        }
      }],
      nameTextStyle: {
        color: '#E6EAFF',
        fontSize: 20,
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
    xAxis: {
      type: 'category',
      data: formatXItems,
      nameTextStyle: {
        color: '#E6EAFF',
        // fontSize: 20,
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

export { StackedHistogram };
