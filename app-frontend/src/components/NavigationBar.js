import React, {useState} from "react";
import {Box, Flex, Text,  Stack} from "@chakra-ui/react";
import {Link} from 'react-router-dom';
import Logo from"./Logo";

const NavBar = (props) => {
    // useState is a Hook and returns current state and function tto update it
    // The arguement "False" sets the intial state to false
    const [navOpen, setNavOpen] = useState(false);

    // Function to toggle the value of navOpen
    const toggle = () => setNavOpen(!navOpen);

    return (
        <NavBarContainer {...props}>
            <Logo
             w="100px"
             color="black"
            />
            <MenuToggle toggle={toggle} navOpen={navOpen} />
            <MenuLinks navOpen={navOpen} />
        </NavBarContainer>
    );
};

const CloseIcon = () => (
    <svg 
     width="24" 
     viewBox="0 0 18 18" 
     xmlns="http://www.w3.org/2000/svg">
        <title>Close</title>
        <path
         fill="black"
         d="M9.00023 7.58599L13.9502 2.63599L15.3642 4.04999L10.4142 8.99999L15.3642 13.95L13.9502 15.364L9.00023 10.414L4.05023 15.364L2.63623 13.95L7.58623 8.99999L2.63623 4.04999L4.05023 2.63599L9.00023 7.58599Z"
         />
    </svg>
);

const MenuIcon = () => (
    <svg 
     width="24px" 
     viewBox="0 0 20 20" 
     xmlns="http://www.w3.org/2000/svg">
        <title>Menu</title>
        <path
        fill="black" 
        d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
    </svg>
);

// MenuToggle is a box if display is less than md 
// it displays closeIcon if navOpen is true and MenuIcon otherwise
const MenuToggle = ({toggle, navOpen}) => {
    return (
        <Box display={{base: "block", md: "none"}} onClick={toggle}>
            {navOpen ? <CloseIcon /> : <MenuIcon />}
        </Box>
    );
};

const MenuItem = ({children, to="/", ...rest}) => {
    return (
        <Link to={to}>
            <Text display="block" {...rest}>
                {children}
            </Text>
        </Link>
    )
}

const MenuLinks = ({ navOpen }) => {
    return (
      <Box
        display={{ base: navOpen ? "block" : "none", md: "block" }}
        flexBasis={{ base: "100%", md: "auto" }}
        
      >
        <Stack
          spacing={8}
          align="center"
          justify={["center", "ceneter", "flex-end", "flex-end"]}
          direction={["column", "column", "row", "row"]}
          pt={[4, 4, 0, 0]}
        >
          <MenuItem to="/about">About</MenuItem>
          <MenuItem to="/">Chart</MenuItem>
        </Stack>
      </Box>
    );
  };

  const NavBarContainer = ({ children, ...props }) => {
    return (
      <Flex
        as="nav"
        align="center"
        justify="space-between"
        wrap="wrap"
        w="100%"
        mb={8}
        p={8}
        bg={["gray.200", "gray.200", "gray.200", "gray.200"]}
        color={["black", "black", "primary.700", "primary.700"]}
        {...props}
      >
        {children}
      </Flex>
    );
  };
  
  export default NavBar;


