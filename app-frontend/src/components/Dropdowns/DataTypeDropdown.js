import React from 'react';
import { Select, Tooltip, useColorMode } from '@chakra-ui/react';

const dataTypes = [
  'COVID-19 Cases',
  'Employment',
  'Weekly Earnings',
  'CERB Payments',
];

const DataTypeDropdown = props => {
  const { colorMode } = useColorMode();

  return (
    <Tooltip
      label="Select the type of data you would like to see for this dataset"
      placement="top"
    >
      <Select
        placeholder="Select Type of Data"
        value={props.value}
        isDisabled={false}
        onChange={e => props.onChange(e)}
        marginY="0.5rem"
        fontWeight="medium"
        // responsive styling for different screen sizes
        width={{ base: '100%', sm: '195px', '2xl': '220px' }}
        height={{ base: '24px', sm: '32px', md: '40px' }}
        // styling based on whether its in light mode or dark mode
        backgroundColor={colorMode === 'light' ? 'gray.200' : 'gray.600'}
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

export default DataTypeDropdown;
