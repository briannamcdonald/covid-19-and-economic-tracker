import React from 'react';
import { Line } from 'react-chartjs-2';

const DynamicChart = props => {
  return (
    <Line
      data={props.data}
      width={100}
      height={50}
      options={{ maintainAspectRatio: false }}
    />
  );
};

export default DynamicChart;
