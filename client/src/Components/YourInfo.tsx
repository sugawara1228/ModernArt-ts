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
import { UserObj } from '../types/types';


/** ユーザー情報（自分）エリア　コンポーネント */
const YourInfo:React.FC<YourInfoProps> = ( props ) => {
    const { users } = props;
    const socket: Socket = useContext(SocketContext);
    const myUserObj: UserObj | undefined = users.find((user) => user.userId === socket.id);
    if (!myUserObj) {
        throw new Error("myUserObj not found"); 
    }
    const [ currentMoney, setCurrentMoney ] = useState<number>(myUserObj.money);

    useEffect(() => {
        setCurrentMoney(myUserObj.money);
    }, [users]);

    // カンマを挿入する関数
    const formatNumberWithCommas = (number: number) => {
        if(number) {
            return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        }
    };

    return (
        <>
        {users.map((user, index) => (
            user.userId === socket.id ? (
                <Flex 
                    w="50%" 
                    h="100%" 
                    maxH="10rem" 
                    bg={mainColor} 
                    borderRadius="8px" 
                    mb="1rem" 
                    color={subColor} 
                    justify="center" 
                    align="center" 
                    key={index} 
                    border="2px solid rgba(255, 255, 255, 0.4)"
                >
                    <Flex w="50%" h="100%" justify="center" align="center" flexDirection="column">
                        <Text as="b" key={user.userId} fontSize="20px" color={subColor} mb=".5rem" borderRadius="4px">
                            {user.name}
                        </Text>
                        <Flex w="80%" h="3rem" justify="center" align="center" bg="white" color={mainColor} borderRadius="8px">
                            <Text as="b" fontSize="21px">${formatNumberWithCommas(currentMoney)}</Text>
                        </Flex>
                    </Flex>
                    <Flex w="50%" h="100%" justify="center" align="center" flexDirection="column">
                        <Flex justify="center" align="center" mt=".5rem">
                            <Flex w="2.4rem" h="2.4rem" bg={color_g} color={mainColor} justify="center" align="center" borderRadius="3px" mr="0.5rem">
                                {user.haveCardType.gogh}
                            </Flex>
                            <Flex w="2.4rem" h="2.4rem" bg={color_p} color={mainColor} justify="center" align="center" borderRadius="3px" mr="0.5rem">
                                {user.haveCardType.Picasso}
                            </Flex>
                            <Flex w="2.4rem" h="2.4rem" bg={color_m} color={mainColor} justify="center" align="center" borderRadius="3px" mr="0.5rem">
                                {user.haveCardType.Munch}
                            </Flex>
                        </Flex>
                        <Flex justify="center" align="center" mt=".5rem">
                            <Flex w="2.4rem" h="2.4rem" bg={color_v} color={mainColor} justify="center" align="center" borderRadius="3px" mr="0.5rem">
                                {user.haveCardType.Vermeer}
                            </Flex>
                            <Flex w="2.4rem" h="2.4rem" bg={color_d} color={mainColor} justify="center" align="center" borderRadius="3px" mr="0.5rem">
                                {user.haveCardType.daVinci}
                            </Flex>  
                        </Flex>
                    </Flex>
                </Flex>
            ) : null
        ))}
        </>
    );
}

export default YourInfo;
