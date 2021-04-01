import React, { useState, useEffect } from 'react';
import { Line, Radar, Bar } from 'react-chartjs-2';
import { Flex, Checkbox, useColorMode } from '@chakra-ui/react';
import axios from 'axios';
import {
  monthLabels,
  typeMap,
  locationMap,
  yAxisLabelMap,
} from './ChartLabelData';

const DynamicChart = props => {
  const baseUrl = 'http://localhost:3000/data/';

  const { colorMode } = useColorMode();

  // handles the data displayed in the chart
  const [chartState, setChartState] = useState({
    dataObject1: {},
    dataObject2: {},
  });

  // handles whether the logarithmic scale checkbox is checked or not
  const [checked, setChecked] = useState(false);
  const handleCheckbox = () => {
    setChecked(!checked);
  };

  useEffect(() => {
    // fetches data from the backend and updates the chart whenever the dropdown state changes or the scale checkbox changes
    const getData = () => {
      var data1;
      var data2;

      var industry1 =
        props.type1 === 'Employment' || props.type1 === 'Weekly Earnings'
          ? '_' + props.industry1
          : '';
      var industry2 =
        props.type2 === 'Employment' || props.type2 === 'Weekly Earnings'
          ? '_' + props.industry2
          : '';

      axios
        .get(baseUrl + typeMap[props.type1] + industry1 + '/' + props.location1)
        .then(res => {
          data1 = res.data.data.data;
          axios
            .get(
              baseUrl + typeMap[props.type2] + industry2 + '/' + props.location2
            )
            .then(res => {
              data2 = res.data.data.data;
              setChartState({
                dataObject1: data1,
                dataObject2: data2,
              });
            });
        });
    };
    getData();
  }, [
    props.type1,
    props.type2,
    props.location1,
    props.location2,
    props.industry1,
    props.industry2,
    props.chartType,
    checked,
  ]);

  // a helper function to shorten the industry so that our chart labels aren't too long
  const getShortenedIndustry = industry => {
    if (industry.length > 10) {
      return industry.substring(0, 11).trim() + '...';
    } else {
      return industry;
    }
  };

  // the first part of the chart labels that show the data type and the industry if applicable
  const labelStart1 =
    props.type1 === 'Employment' || props.type1 === 'Weekly Earnings'
      ? props.type1 + ': ' + getShortenedIndustry(props.industry1)
      : props.type1;
  const labelStart2 =
    props.type2 === 'Employment' || props.type2 === 'Weekly Earnings'
      ? props.type2 + ': ' + getShortenedIndustry(props.industry2)
      : props.type2;

  const dataSet1 = {
    label: labelStart1 + ' - ' + locationMap[props.location1] + ' - 2020',
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
    label: labelStart2 + ' - ' + locationMap[props.location2] + ' - 2020',
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
          // if the logarithmic scale checkbox is checked, set the type to logarithmic
          // else set the type to linear to use a linear scale
          type: checked ? 'logarithmic' : 'linear',
          scaleLabel: {
            display: true,
            labelString: yAxisLabelMap[props.type1],
            fontColor: colorMode === 'light' ? '#1A202C' : 'white',
          },
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
          scaleLabel: {
            display: true,
            labelString: 'Month of the Year',
            fontColor: colorMode === 'light' ? '#1A202C' : 'white',
          },
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
  // configuration and styling for the radar chart
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

  // returns the correct chart based on the option selected in the chart type dropdown
  const getChart = () => {
    if (props.chartType === 'Line Chart') {
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
    } else if (props.chartType === 'Radar Chart') {
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
    } else if (props.chartType === 'Bar Chart') {
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

  return (
    <Flex
      flexDirection="column"
      width="100%"
      height="100%"
      alignItems="center"
      justifyContent="center"
    >
      {getChart()}
      <Checkbox
        // don't show the checkbox when the chart type is radar
        display={props.chartType !== 'Radar Chart' ? 'flex' : 'none'}
        marginTop="0.5rem"
        colorScheme={colorMode === 'light' ? 'blackAlpha' : 'whiteAlpha'}
        iconColor={colorMode === 'light' ? 'teal.100' : 'teal.500'}
        isChecked={checked}
        onChange={handleCheckbox}
      >
        Logarithmic Scale
      </Checkbox>
    </Flex>
  );
};

export default DynamicChart;
