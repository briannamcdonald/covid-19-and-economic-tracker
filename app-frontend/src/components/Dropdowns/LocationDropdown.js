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
      backgroundColor="gray.200"
      color="black"
      fontWeight="medium"
      // responsive styling for different screen sizes
      width={{ base: '100%', sm: '195px', '2xl': '220px' }}
      height={{ base: '24px', sm: '32px', md: '40px' }}
      marginTop="0.5rem"
      marginBottom={{ base: '1.2rem', sm: '1rem' }}
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
