import React, { useState } from 'react';
import {
  Box,
  Flex,
  Button,
  Stack,
  IconButton,
  useColorMode,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { IoMdMoon, IoMdClose } from 'react-icons/io';
import { FiSun, FiMenu } from 'react-icons/fi';
import Logo from './Logo';

const NavBar = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  // initially make the navigation dropdown closed
  const [navOpen, setNavOpen] = useState(false);

  // Function to toggle the value of navOpen to open or close the navigation dropdown
  const toggle = () => setNavOpen(!navOpen);

  const MenuToggle = () => {
    return (
      <IconButton
        // displays a close icon if navOpen is true and a menu icon otherwise
        icon={navOpen ? <IoMdClose /> : <FiMenu />}
        isRound
        variant="ghost"
        fontSize="1.5rem"
        // displays only if screen size is less than md
        display={{ base: 'flex', md: 'none' }}
        onClick={toggle}
      />
    );
  };

  const ColorModeToggle = () => {
    return (
      <IconButton
        aria-label="Toggle color mode"
        isRound
        variant="ghost"
        fontSize="1.4rem"
        marginLeft="2rem"
        // responsive styling based on the screen size
        marginRight={{ base: '1.5rem', md: '0' }}
        _focus={{ outline: 'none' }}
        icon={colorMode === 'light' ? <IoMdMoon /> : <FiSun />}
        onClick={() => toggleColorMode(!colorMode)}
      />
    );
  };

  const MenuItem = ({ children, to = '/' }) => {
    return (
      <Link to={to}>
        <Button variant="ghost" display="block">
          {children}
        </Button>
      </Link>
    );
  };

  const MenuLinks = () => {
    return (
      <Box
        display={{ base: navOpen ? 'block' : 'none', md: 'block' }}
        flexBasis={{ base: '100%', md: 'auto' }}
      >
        <Stack
          spacing={8}
          alignItems="center"
          justifyContent={{ base: 'center', md: 'flex-end' }}
          direction={{ base: 'column', md: 'row' }}
          padding={{ base: 1, md: 0 }}
        >
          <MenuItem to="/about">About</MenuItem>
          <MenuItem to="/">Chart</MenuItem>
        </Stack>
      </Box>
    );
  };

  const NavBarContainer = ({ children }) => {
    return (
      <Flex
        as="nav"
        position="absolute"
        top="0"
        alignItems="center"
        justifyContent="space-between"
        flexWrap="wrap"
        width="100%"
        marginBottom={8}
        paddingY={{ base: 2, md: 3 }}
        paddingX={8}
        boxShadow={
          colorMode === 'light'
            ? '0 3px 2px -1px rgba(0, 0, 0, 0.2)'
            : '0 3px 2px -1px rgba(255, 255, 255, 0.2)'
        }
        background={colorMode === 'light' ? 'gray.200' : 'gray.600'}
      >
        {children}
      </Flex>
    );
  };

  return (
    <NavBarContainer>
      {navOpen ? (
        <Box width="100%">
          <Flex justifyContent="space-between" alignItems="center">
            <Logo />
            <MenuToggle />
          </Flex>
          <MenuLinks />
        </Box>
      ) : (
        <Flex width="100%" justifyContent="space-between" alignItems="center">
          <Logo />
          <Flex
            alignItems="center"
            justifyContent="center"
            flexDirection={{ base: 'row', md: 'row-reverse' }}
          >
            <ColorModeToggle />
            <MenuToggle />
            <MenuLinks />
          </Flex>
        </Flex>
      )}
    </NavBarContainer>
  );
};

export default NavBar;
