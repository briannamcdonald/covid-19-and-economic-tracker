import React from 'react';
import { Select, Tooltip, useColorMode } from '@chakra-ui/react';

const dataTypes = ['Line Chart', 'Bar Chart', 'Radar Chart'];

const ChartTypeDropdown = props => {
  const { colorMode } = useColorMode();
  // If no value is defined, use a line chart by default
  var value = props.value.length !== 0 ? props.value : 'Line Chart';

  return (
    <Tooltip
      label="Select the type of chart you would like to use for the datasets"
      placement="top"
    >
      <Select
        value={value}
        isDisabled={false}
        onChange={e => props.onChange(e)}
        marginY="0.5rem"
        // styling based on whether its in light mode or dark mode
        backgroundColor={colorMode === 'light' ? 'teal.100' : 'teal.500'}
        color="black"
        fontWeight="medium"
        // responsive styling for different screen sizes
        width={{ base: '100%', sm: '140px', '2xl': '180px' }}
        height={{ base: '24px', sm: '32px', md: '40px' }}
        marginX={{ base: '0', sm: '0.5rem' }}
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
