import React from 'react';
import { Select, Tooltip, useColorMode } from '@chakra-ui/react';

const industries = [
  'Industrial aggregate including unclassified businesses',
  'Industrial aggregate excluding unclassified businesses',
  'Accommodation and food services',
  'Administrative and support, waste management and remediation services',
  'Arts, entertainment and recreation',
  'Construction',
  'Durable goods',
  'Educational services',
  'Finance and insurance',
  'Forestry, logging and support',
  'Goods producing industries',
  'Health care and social assistance',
  'Information and cultural industries',
  'Management of companies and enterprises',
  'Manufacturing',
  'Mining, quarrying, and oil and gas extraction',
  'Non-durable goods',
  'Other services (except public administration)',
  'Professional, scientific and technical services',
  'Public administration',
  'Real estate and rental and leasing',
  'Retail trade',
  'Service producing industries',
  'Trade',
  'Transportation and warehousing',
  'Utilities',
  'Wholesale trade',
];

const IndustryDropdown = props => {
  const { colorMode } = useColorMode();

  return (
    <Tooltip
      label="Select the industry you would like to see the dataset for"
      placement="top"
    >
      <Select
        isDisabled={false}
        display={props.display}
        value={props.value}
        onChange={e => props.onChange(e)}
        // styling based on whether its in light mode or dark mode
        backgroundColor={colorMode === 'light' ? 'gray.200' : 'gray.600'}
        fontWeight="medium"
        // responsive styling for different screen sizes
        width={{ base: '100%', sm: '195px', '2xl': '220px' }}
        height={{ base: '24px', sm: '32px', md: '40px' }}
        marginY="0.5rem"
        marginX={{ base: '0', xl: '1rem' }}
      >
        {industries.map(industry => {
          return (
            <option key={industry} value={industry}>
              {industry}
            </option>
          );
        })}
      </Select>
    </Tooltip>
  );
};

export default IndustryDropdown;
