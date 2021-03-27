import React from "react"
import {Box, Text } from "@chakra-ui/react"

const Logo = props => {
    return (
        <Box {...props}>
            <Text fonstSize="lg" fontWeight="bold">
                Logo
            </Text>
        </Box>
    )
}

export default Logo;