import React, { useState, useRef, useEffect, useContext }from 'react';
import { 
    Button,
    Text,
    Input,
    Flex,
    Box
} from '@chakra-ui/react';
import { Socket } from 'socket.io-client';
import { SocketContext } from '../index';
import { YourInfoProps } from "../types/types";
import { mainColor, subColor, color_d, color_g, color_m, color_p, color_v } from '../constants/cssConstants';


/** ユーザー情報（自分）エリア　コンポーネント */
const YourInfo:React.FC<YourInfoProps> = ( props ) => {
    const { users } = props;
    const socket: Socket = useContext(SocketContext);

    return (
        <>
        {users.map((user, index) => (
            user.userId === socket.id ? (
                <Flex w="50%" h="100%" maxH="10rem" bg={mainColor} borderRadius="8px" mb="1rem" color={subColor} justify="center" align="center" key={index} >
                    <Flex w="50%" h="100%" justify="center" align="center" flexDirection="column">
                        <Text as="b" key={user.userId} color={subColor} mb=".5rem" borderRadius="4px">
                            {user.name}
                        </Text>
                        <Flex w="80%" h="3rem" justify="center" align="center" bg="white" color={mainColor} borderRadius="8px">
                            <Text as="b" fontSize="21px">$100,000</Text>
                        </Flex>
                    </Flex>
                    <Flex w="50%" h="100%" justify="center" align="center" flexDirection="column">
                        <Flex justify="center" align="center" mt=".5rem">
                            <Box as="span" display="inline-block" w="2.4rem" h="2.4rem" bg={color_g} borderRadius="3px" mr="0.5rem">

                            </Box>
                            <Box as="span" display="inline-block" w="2.4rem" h="2.4rem" bg={color_p} borderRadius="3px" mr="0.5rem">

                            </Box>
                            <Box as="span" display="inline-block" w="2.4rem" h="2.4rem" bg={color_m} borderRadius="3px" mr="0.5rem">

                            </Box>
                        </Flex>
                        <Flex justify="center" align="center" mt=".5rem">
                            <Box as="span" display="inline-block" w="2.4rem" h="2.4rem" bg={color_v} borderRadius="3px" mr="0.5rem">

                            </Box>
                            <Box as="span" display="inline-block" w="2.4rem" h="2.4rem" bg={color_d} borderRadius="3px" mr="0.5rem">

                            </Box>
                            <Box as="span" display="inline-block" w="2.4rem" h="2.4rem" bg="gray" borderRadius="3px" mr="0.5rem">

                            </Box>
                        </Flex>
                    </Flex>
                </Flex>
            ) : null
        ))}
        </>
    );
}

export default YourInfo;
