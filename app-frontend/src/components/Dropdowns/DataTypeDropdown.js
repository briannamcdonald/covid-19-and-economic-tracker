import React from 'react';
import { Select } from '@chakra-ui/react';

const dataTypes = [
  'COVID-19 Cases',
  'Employment',
  'Weekly Earnings',
  'CERB Payments',
];

const DataTypeDropdown = props => {
  return (
    <Select
      placeholder="Select Type of Data"
      value={props.value}
      isDisabled={false}
      onChange={e => props.onChange(e)}
      marginTop="0.5rem"
      backgroundColor="gray.200"
      color="black"
      fontWeight="medium"
      width="220px"
    >
      {dataTypes.map(type => {
        return (
          <option key={type} value={type}>
            {type}
          </option>
        );
      })}
    </Select>
  );
};

export default DataTypeDropdown;
