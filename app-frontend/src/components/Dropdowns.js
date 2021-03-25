import React from 'react';
import { Flex } from '@chakra-ui/react';

import DataTypeDropdown from './Dropdowns/DataTypeDropdown';
import LocationDropdown from './Dropdowns/LocationDropdown';
import IndustryDropdown from './Dropdowns/IndustryDropdown';

const Dropdowns = props => {
  return (
    <Flex justifyContent="space-between" width="100%" flexWrap="wrap">
      <Flex
        flexDirection="column"
        justifyContent="space-between"
        // responsive styling for different screen sizes
        width={{ base: '100%', sm: 'auto' }}
      >
        <Flex flexDirection={{ base: 'column', xl: 'row' }} flexWrap="wrap">
          <DataTypeDropdown
            value={props.dropdownState.type1}
            onChange={e => props.handleDropdownChange(e, 'type1')}
          />
          {/* only show the industry dropdown when the type is weekly earnings or employment */}
          <IndustryDropdown
            display={
              props.dropdownState.type1 === 'Weekly Earnings' ||
              props.dropdownState.type1 === 'Employment'
                ? 'block'
                : 'none'
            }
            value={props.dropdownState.industry1}
            onChange={e => props.handleDropdownChange(e, 'industry1')}
          />
        </Flex>
        <LocationDropdown
          value={props.dropdownState.location1}
          onChange={e => props.handleDropdownChange(e, 'location1')}
          isDisabled={
            props.dropdownState.type1 === 'CERB Payments' ? true : false
          }
        />
      </Flex>
      <Flex
        flexDirection="column"
        alignItems="flex-end"
        justifyContent="space-between"
        width={{ base: '100%', sm: 'auto' }}
      >
        <Flex
          flexDirection={{ base: 'column', xl: 'row' }}
          flexWrap="wrap"
          width={{ base: '100%', sm: 'auto' }}
        >
          {/* show this industry dropdown when the screen is larger */}
          <IndustryDropdown
            display={{
              base: 'none',
              xl:
                props.dropdownState.type2 === 'Weekly Earnings' ||
                props.dropdownState.type2 === 'Employment'
                  ? 'block'
                  : 'none',
            }}
            value={props.dropdownState.industry2}
            onChange={e => props.handleDropdownChange(e, 'industry2')}
          />
          <DataTypeDropdown
            value={props.dropdownState.type2}
            onChange={e => props.handleDropdownChange(e, 'type2')}
          />
          {/* show this industry dropdown when the screen is smaller */}
          <IndustryDropdown
            display={{
              base:
                props.dropdownState.type2 === 'Weekly Earnings' ||
                props.dropdownState.type2 === 'Employment'
                  ? 'block'
                  : 'none',
              xl: 'none',
            }}
            value={props.dropdownState.industry2}
            onChange={e => props.handleDropdownChange(e, 'industry2')}
          />
        </Flex>
        <LocationDropdown
          value={props.dropdownState.location2}
          onChange={e => props.handleDropdownChange(e, 'location2')}
          isDisabled={
            props.dropdownState.type2 === 'CERB Payments' ? true : false
          }
        />
      </Flex>
    </Flex>
  );
};

export default Dropdowns;
