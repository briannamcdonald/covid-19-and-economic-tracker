import React, { useState, useEffect } from 'react';
import { Line, Radar, Bar } from 'react-chartjs-2';
import { useColorMode } from '@chakra-ui/react';
import axios from 'axios';

const DynamicChart = props => {
  const { colorMode } = useColorMode();

  const labelStart1 =
    props.type1 === 'Employment' || props.type1 === 'Weekly Earnings'
      ? props.type1 + ': ' + props.industry1
      : props.type1;
  const labelStart2 =
    props.type2 === 'Employment' || props.type2 === 'Weekly Earnings'
      ? props.type2 + ': ' + props.industry2
      : props.type2;

  const monthLabels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const typeMap = {'COVID-19 Cases' : 'covid_cases', 'Employment' : 'employment', 'Weekly Earnings' : 'weekly_earnings', 'CERB Payments' : 'cerb'};
  const baseUrl = 'http://localhost:3000/data/';

  const [chartState, setChartState] = useState({
    dataObject1: {},
    dataObject2: {}
  });

  useEffect(() => {
    getData();
  });

  const getData = () => {
    var data1;
    var data2;

    var industry1 = (props.type1 === 'Employment' || props.type1 === "Weekly Earnings") ? ('_' + props.industry1) : '';
    var industry2 = (props.type2 === 'Employment' || props.type2 === "Weekly Earnings") ? ('_' + props.industry2) : '';

    axios.get(baseUrl + typeMap[props.type1] + industry1 + '/' + props.location1).then(res => {
      data1 = res.data.data.data;
      axios.get(baseUrl + typeMap[props.type2] + industry2 + '/' + props.location2).then(res => {
        data2 = res.data.data.data;
        setChartState({
          dataObject1: data1,
          dataObject2: data2
        });
      });
    });
  };

  const dataSet1 = {
    label: labelStart1 + ' - ' + props.location1 + ' - 2020',
    backgroundColor: 'rgba(255, 96, 43, 0.5)',
    borderColor: 'rgba(255, 96, 43, 0.8)',
    borderWidth: 2,
    data: [
      chartState.dataObject1['01-2020'],
      chartState.dataObject1['02-2020'],
      chartState.dataObject1['03-2020'],
      chartState.dataObject1['04-2020'],
      chartState.dataObject1['05-2020'],
      chartState.dataObject1['06-2020'],
      chartState.dataObject1['07-2020'],
      chartState.dataObject1['08-2020'],
      chartState.dataObject1['09-2020'],
      chartState.dataObject1['10-2020'],
      chartState.dataObject1['11-2020'],
      chartState.dataObject1['12-2020'],
    ],
  };

  const dataSet2 = {
    label: labelStart2 + ' - ' + props.location2 + ' - 2020',
    backgroundColor: 'rgba(69, 181, 255, 0.5)',
    borderColor: 'rgba(69, 181, 255, 0.8)',
    borderWidth: 2,
    data: [
      chartState.dataObject2['01-2020'],
      chartState.dataObject2['02-2020'],
      chartState.dataObject2['03-2020'],
      chartState.dataObject2['04-2020'],
      chartState.dataObject2['05-2020'],
      chartState.dataObject2['06-2020'],
      chartState.dataObject2['07-2020'],
      chartState.dataObject2['08-2020'],
      chartState.dataObject2['09-2020'],
      chartState.dataObject2['10-2020'],
      chartState.dataObject2['11-2020'],
      chartState.dataObject2['12-2020'],
    ],
  };

  const chartType = props.chartType;

  // chart configuration and styling to handle light and dark mode styles
  const options = {
    maintainAspectRatio: false,
    responsive: true,
    legend: {
      labels: {
        fontColor: colorMode === 'light' ? 'black' : 'white',
      },
    },
    scales: {
      yAxes: [
        {
          ticks: {
            fontColor: colorMode === 'light' ? '#1A202C' : 'white',
          },
          gridLines: {
            color: colorMode === 'light' ? '#E2E8F0' : '#718096',
          },
        },
      ],
      xAxes: [
        {
          ticks: {
            fontColor: colorMode === 'light' ? '#1A202C' : 'white',
          },
          gridLines: {
            color: colorMode === 'light' ? '#E2E8F0' : '#718096',
          },
        },
      ],
    },
  };
  const radarOptions = {
    maintainAspectRatio: false,
    responsive: true,
    legend: {
      labels: {
        fontColor: colorMode === 'light' ? 'black' : 'white',
      },
    },
    scale: {
      ticks: {
        fontColor: 'black',
      },
      pointLabels: {
        fontColor: colorMode === 'light' ? 'black' : 'white',
      },
      gridLines: {
        color: colorMode === 'light' ? '#A0AEC0' : '#718096',
      },
      angleLines: {
        color: colorMode === 'light' ? '#A0AEC0' : '#718096',
      },
    },
  };

  if (chartType === 'Line Chart') {
    return (
      <Line
        data={{
          labels: monthLabels,
          datasets: [dataSet1, dataSet2],
        }}
        width={100}
        height={50}
        options={{ ...options }}
      />
    );
  } else if (chartType === 'Radar Chart') {
    return (
      <Radar
        data={{
          labels: monthLabels,
          datasets: [dataSet1, dataSet2],
        }}
        width={100}
        height={50}
        options={{ ...radarOptions }}
      />
    );
  } else if (chartType === 'Bar Chart') {
    return (
      <Bar
        data={{
          labels: monthLabels,
          datasets: [dataSet1, dataSet2],
        }}
        width={100}
        height={50}
        options={{ ...options }}
      />
    );
  }
};

export default DynamicChart;
