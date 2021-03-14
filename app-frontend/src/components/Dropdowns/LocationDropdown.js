import React from 'react';
import { Select } from '@chakra-ui/react';

const locations = [
  'Alberta',
  'British Columbia',
  'Canada',
  'Manitoba',
  'New Brunswick',
  'Newfoundland and Labrador',
  'Northwest Territories',
  'Nova Scotia',
  'Nunavut',
  'Ontario',
  'Prince Edward Island',
  'Quebec',
  'Saskatchewan',
  'Yukon',
];

const LocationDropdown = props => {
  return (
    <Select
      placeholder="Select Location"
      value={props.value}
      onChange={props.onChange}
      isDisabled={props.isDisabled}
      marginY="1rem"
      backgroundColor="gray.200"
      color="black"
      fontWeight="medium"
      width="220px"
      _disabled={{ backgroundColor: 'gray.200', cursor: 'not-allowed' }}
    >
      {locations.map(location => {
        return (
          <option key={location} value={location}>
            {location}
          </option>
        );
      })}
    </Select>
  );
};

export default LocationDropdown;
