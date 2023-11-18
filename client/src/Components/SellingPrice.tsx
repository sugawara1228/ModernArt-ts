import React, { useState, useRef, useEffect }from 'react';
import { 
    Button,
    Text,
    Input,
    Box,
    Flex,
    List,
    ListItem
} from '@chakra-ui/react';
import { mainColor, subColor, color_d, color_g, color_m, color_p, color_v } from '../constants/cssConstants';
import Gbox from './GlassBox';

/** 現在の売値　表示エリア */
const SellingPrice:React.FC = ( ) => {

  return (
    <Flex w="100%" h="40%" bg={mainColor} borderRadius="8px" mb="2rem" color={subColor} justify="center" align="center">
        <Flex w="90%" h="90%" border="1px solid" flexDirection="column" justify="center" align="center">
            <Text>現在の売値</Text>
            <List w="100%" textAlign="center" fontSize="15px" mt=".5rem">
                <ListItem mb=".5rem">
                    
                    <Text as="span" display="inline-block" textAlign="left" w="35%" ml="3rem">
                        <Box as="span" display="inline-block" w="1rem" h="1rem" bg={color_g} borderRadius="3px" mr="0.5rem"/>
                        Gogh
                        </Text>
                    <Text as="span" display="inline-block" textAlign="left" w="35%">: $30,000</Text>
                </ListItem>
                <ListItem mb=".5rem">
                    <Text as="span" display="inline-block" textAlign="left" w="35%" ml="3rem">
                        <Box as="span" display="inline-block" w="1rem" h="1rem" bg={color_p} borderRadius="3px" mr="0.5rem"/>
                        Picasso
                    </Text>
                    <Text as="span" display="inline-block" textAlign="left" w="35%">: $20,000</Text>
                </ListItem>
                <ListItem mb=".5rem">
                    <Text as="span" display="inline-block" textAlign="left" w="35%" ml="3rem">
                        <Box as="span" display="inline-block" w="1rem" h="1rem" bg={color_m} borderRadius="3px" mr="0.5rem"/>
                        Munch
                    </Text>
                    <Text as="span" display="inline-block" textAlign="left" w="35%">: $10,000</Text>
                </ListItem>
                <ListItem mb=".5rem">
                    <Text as="span" display="inline-block" textAlign="left" w="35%" ml="3rem">
                        <Box as="span" display="inline-block" w="1rem" h="1rem" bg={color_v} borderRadius="3px" mr="0.5rem"/>
                        Vermeer
                    </Text>
                    <Text as="span" display="inline-block" textAlign="left" w="35%">: $0</Text>
                </ListItem>
                <ListItem>
                    <Text as="span" display="inline-block" textAlign="left" w="35%" ml="3rem">
                        <Box as="span" display="inline-block" w="1rem" h="1rem" bg={color_d} borderRadius="3px" mr="0.5rem"/>
                        da Vinci
                    </Text>
                    <Text as="span" display="inline-block" textAlign="left" w="35%">: $0</Text>
                </ListItem>
            </List>
        </Flex>
    </Flex>
  );
}

export default SellingPrice;
