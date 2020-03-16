import React from "react";
import { graphic } from 'echarts';
import ReactEcharts from "echarts-for-react";
import { ChartProps } from 'src/types';

const HorizontalHistogram = (props: ChartProps) => {
  const { title, startColor='#00A7FC', endColor='#064AD7', series=[] } = props;
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
    color: [new graphic.LinearGradient(
      0, 0, 0, 1,
      [
        { offset: 0, color: startColor },
        { offset: 1, color: endColor }
      ]
    )],
    dataset: {
      source: series,
    },
    grid: { containLabel: true },
    xAxis: {
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
    yAxis: {
      type: 'category',
      textStyle: {
        fontSize: 16,
      }
    },
    series: [
      {
        type: 'bar',
        barMaxWidth: 12,
        itemStyle: {
          barBorderRadius: 6.5,
        },
        label: {
          normal: {
            show: true,
            position: 'top',
          }
        },
        encode: {
          // Map the "amount" column to X axis.
          x: 'amount',
          // Map the "name" column to Y axis
          y: 'name'
        }
      }
    ]
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

export { HorizontalHistogram };
