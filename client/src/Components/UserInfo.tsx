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
import { UserInfoProps } from "../types/types";
import { mainColor, subColor, color_d, color_g, color_m, color_p, color_v } from '../constants/cssConstants';


/** ユーザー情報エリア　コンポーネント */
const UserInfo:React.FC<UserInfoProps> = ( props ) => {
    const { users } = props;
    const socket: Socket = useContext(SocketContext);

    return (
        <>
        {users.map((user, index) => (
            user.userId === socket.id ? null : (
                <Flex w="100%" h="25%" maxW="12rem" maxH="10rem" bg={mainColor} borderRadius="8px" mb="1rem" color={subColor} justify="center" align="center" key={index} >
                    <Flex w="90%" h="90%" border="1px solid" flexDirection="column" align="center">
                        <Text as="b" key={user.userId} color={subColor}  py=".1rem" px=".5rem" mt=".5rem" borderRadius="4px">
                            {user.name}
                        </Text>
                        <Flex justify="center" align="center" mt=".5rem">
                            <Box as="span" display="inline-block" w="2rem" h="2rem" bg={color_g} borderRadius="3px" mr="0.5rem">

                            </Box>
                            <Box as="span" display="inline-block" w="2rem" h="2rem" bg={color_p} borderRadius="3px" mr="0.5rem">

                            </Box>
                            <Box as="span" display="inline-block" w="2rem" h="2rem" bg={color_m} borderRadius="3px" mr="0.5rem">

                            </Box>
                        </Flex>
                        <Flex justify="center" align="center" mt=".5rem">
                            <Box as="span" display="inline-block" w="2rem" h="2rem" bg={color_v} borderRadius="3px" mr="0.5rem">

                            </Box>
                            <Box as="span" display="inline-block" w="2rem" h="2rem" bg={color_d} borderRadius="3px" mr="0.5rem">

                            </Box>
                            <Box as="span" display="inline-block" w="2rem" h="2rem" bg="gray" borderRadius="3px" mr="0.5rem">

                            </Box>
                        </Flex>
                    </Flex>
                </Flex>
            )
        ))}
        </>
    );
}

export default UserInfo;
