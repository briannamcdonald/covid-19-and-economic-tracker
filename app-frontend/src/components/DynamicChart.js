import React from 'react';
import { Line } from 'react-chartjs-2';

const DynamicChart = props => {

    const dataSet1 = {
        label: props.type1 + ' - ' + props.location1 + ' - 2020',
        backgroundColor: 'rgba(225,182,182,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: [
            props.dataObject1['01-2020'],
            props.dataObject1['02-2020'],
            props.dataObject1['03-2020'],
            props.dataObject1['04-2020'],
            props.dataObject1['05-2020'],
            props.dataObject1['06-2020'],
            props.dataObject1['07-2020'],
            props.dataObject1['08-2020'],
            props.dataObject1['09-2020'],
            props.dataObject1['10-2020'],
            props.dataObject1['11-2020'],
            props.dataObject1['12-2020']
        ]
    }

    const dataSet2 = {
        label: props.type2 + ' - ' + props.location2 + ' - 2020',
        backgroundColor: 'rgba(182,191,225,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: [
            props.dataObject2['01-2020'],
            props.dataObject2['02-2020'],
            props.dataObject2['03-2020'],
            props.dataObject2['04-2020'],
            props.dataObject2['05-2020'],
            props.dataObject2['06-2020'],
            props.dataObject2['07-2020'],
            props.dataObject2['08-2020'],
            props.dataObject2['09-2020'],
            props.dataObject2['10-2020'],
            props.dataObject2['11-2020'],
            props.dataObject2['12-2020']
        ]
    }

    return (
        <Line
        data={{
            labels: [
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
            ],
            datasets: [dataSet1, dataSet2],
        }}
        width={100}
        height={50}
        options={{ maintainAspectRatio: false }}
        />
    );
};

export default DynamicChart;
