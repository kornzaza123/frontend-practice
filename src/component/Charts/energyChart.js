import React, { useEffect } from 'react';
import * as echarts from 'echarts';

const EnergyChart = () => {
  useEffect(() => {
    const chartDom = document.getElementById('energy');
    const EnergyChart = echarts.init(chartDom);

    // Generate random voltage data for each monitor
    const generateRandomData = () => {
      const data = [];
      for (let i = 0; i < 24; i++) {
        data.push(Math.random() * 150 + 100); // Generating random voltage between 100 and 250
      }
      return data;
    };

    const monitorData = [];
    for (let monitor = 1; monitor <= 6; monitor++) {
      monitorData.push(generateRandomData());
    }

    const option = {
      title: {
        
      },
      tooltip: {
        trigger: 'axis'
      },

      color: ['#FB9A99', '#D2DAEF', '#E31A1C', '#7BBDED', '#1F78B4', '#291D89'],
      grid: {
        left: '3%',
        right: '4%',
        bottom: '15%',
        containLabel: true
      },
      toolbox: {
        feature: {
          
        }
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00','11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '23:00'],
        axisLabel: {
          fontSize: 10, // Adjust the font size here
        },
        name: 'Time (h)',
        nameLocation: 'middle',
        nameGap: 40
      },

      yAxis: {
        type: 'value',
        axisLabel: {
          fontSize: 10, // Adjust the font size here
        },
        name: 'Energy (kWh)',
        nameGap: 30
        
      },
      series: [
        {
          name: 'Monitor 1',
          type: 'line',
          stack: 'Total',
          data: monitorData[0],
          smooth: true
        },
        {
          name: 'Monitor 2',
          type: 'line',
          stack: 'Total',
          data: monitorData[1],
          smooth: true
        },
        {
          name: 'Monitor 3',
          type: 'line',
          stack: 'Total',
          data: monitorData[2],
          smooth: true
        },
        {
          name: 'Monitor 4',
          type: 'line',
          stack: 'Total',
          data: monitorData[3],
          smooth: true
        },
        {
          name: 'Monitor 5',
          type: 'line',
          stack: 'Total',
          data: monitorData[4],
          smooth: true
        },
        {
          name: 'Monitor 6',
          type: 'line',
          stack: 'Total',
          data: monitorData[5],
          smooth: true
        }
      ]
    };

    EnergyChart.setOption(option);
    // window.addEventListener('resize', () => {
    //   myChart.resize();
    // });


    return () => {
        EnergyChart.dispose();
      // window.removeEventListener('resize', () => {
      //   myChart.resize();
      // });
    };
  }, []);

  return <div id="energy" style={{ width: '100%', height: '350px' }} />;
};

export default EnergyChart;
