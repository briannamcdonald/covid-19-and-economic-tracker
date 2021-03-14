import React from 'react';
import { Select } from '@chakra-ui/react';

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
  return (
    <Select
      placeholder="Select Industry"
      isDisabled={false}
      marginTop="0.5rem"
      backgroundColor="gray.200"
      color="black"
      fontWeight="medium"
      width="220px"
      marginX="1rem"
    >
      {industries.map(industry => {
        return (
          <option key={industry} value={industry}>
            {industry}
          </option>
        );
      })}
    </Select>
  );
};

export default IndustryDropdown;
