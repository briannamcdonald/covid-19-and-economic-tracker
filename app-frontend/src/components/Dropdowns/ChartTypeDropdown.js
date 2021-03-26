import React from 'react';
import { Select, Tooltip } from '@chakra-ui/react';

const dataTypes = [
  'Line Chart',
  'Bar Chart',
  'Radar Chart'
];

const ChartTypeDropdown = props => {
    // If no value is defined, use a line chart by default
    var value = props.value.length != 0 ? props.value : 'Line Chart';

    return (
        <Tooltip label="Select the type of chart you would like to use for the datasets" placement="top">
        <Select
            value={value}
            isDisabled={false}
            onChange={e => props.onChange(e)}
            marginY="0.5rem"
            marginX="0.5rem"
            backgroundColor="teal.100"
            color="black"
            fontWeight="medium"
            // responsive styling for different screen sizes
            width={{ base: '100%', sm: '140px', '2xl': '180px' }}
            height={{ base: '24px', sm: '32px', md: '40px' }}
        >
            {dataTypes.map(type => {
            return (
                <option key={type} value={type}>
                {type}
                </option>
            );
            })}
        </Select>
        </Tooltip>
    );
};

export default ChartTypeDropdown;