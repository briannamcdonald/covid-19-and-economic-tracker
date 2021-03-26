import React from 'react';
import { Line, Radar, Bar } from 'react-chartjs-2';

const DynamicChart = props => {
    const labelStart1 = (props.type1 === 'Employment' || props.type1 === 'Weekly Earnings') ? props.type1 + ': ' + props.industry1 : props.type1;
    const labelStart2 = (props.type2 === 'Employment' || props.type2 === 'Weekly Earnings') ? props.type2 + ': ' + props.industry2 : props.type2;

    // TODO: Remove this if we end up not needing it
    const provincePopulation = {
        'Alberta': 4436258,
        'British Columbia': 5153039,
        'Canada': 38008005,
        'Manitoba': 1380935,
        'New Brunswick': 782078,
        'Newfoundland and Labrador': 520438,
        'Northwest Territories': 45136,
        'Nova Scotia': 979449,
        'Nunavut': 39407,
        'Ontario': 14755211,
        'Prince Edward Island': 159819,
        'Quebec': 8575944,
        'Saskatchewan': 1178832,
        'Yukon': 42192
    };

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
    
    const dataSet1 = {
        label: labelStart1 + ' - ' + props.location1 + ' - 2020',
        backgroundColor: 'rgba(255, 96, 43, 0.5)',
        borderColor: 'rgba(255, 96, 43, 0.8)',
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
    };

    const dataSet2 = {
        label: labelStart2 + ' - ' + props.location2 + ' - 2020',
        backgroundColor: 'rgba(69, 181, 255, 0.5)',
        borderColor: 'rgba(69, 181, 255, 0.8)',
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
    };

    const chartType = props.chartType;

    if (chartType === 'Line Chart') {
        return (
            <Line
            data={{
                labels: monthLabels,
                datasets: [dataSet1, dataSet2],
            }}
            width={100}
            height={50}
            options={{ maintainAspectRatio: false }}
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
            options={{ maintainAspectRatio: false }}
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
            options={{ maintainAspectRatio: false }}
            />
        );
    }
};

export default DynamicChart;
