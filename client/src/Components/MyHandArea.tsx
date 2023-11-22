import React, { useState, useRef, useEffect, useContext }from 'react';
import { 
    Button,
    Text,
    Input,
    Flex,
    Box,
    Image
} from '@chakra-ui/react';
import { Socket } from 'socket.io-client';
import { SocketContext } from '../index';
import { mainColor, subColor, color_d, color_g, color_m, color_p, color_v } from '../constants/cssConstants';
import { Card, RoomObj, UserObj } from '../types/types'



/** ユーザー情報（自分）エリア　コンポーネント */
const MyhandArea:React.FC = () => {
    const socket: Socket = useContext(SocketContext);
    const [hands, setHands] = useState<Card[]>();

    useEffect(() => {
        const handsDistributionHandler = (room: RoomObj) => {
            const myUserObj: UserObj | undefined = room.users.find((user) => user.userId === socket.id);
            console.log(`myUserObj: ${myUserObj}`);
            if(myUserObj) {
                setHands(myUserObj.hands);
                console.log(`myUserObj.hands: ${myUserObj.hands}`);
            }
        }

        // リスナーを登録
        socket.on('handsDistribution', handsDistributionHandler);

        return () => {
            socket.off('handsDistribution', handsDistributionHandler);
        }
    },[])

    return (
        <Flex w="50%" h="100%" justify="center" align="center" position="relative">
            {hands && hands.map((card, index) => (
                    <Image 
                        key={index}
                        w="110px"
                        h="auto"
                        src={`${card.url}`}
                        alt="card"
                        position='absolute'
                        top="0"
                        left={`${index * 40}px`}
                        object-fit="cover"
                        transition="transform 0.3s ease"
                        _hover={{transform: "scale(1.02)"}}
                    />
            ))}
        </Flex>
    );
}

export default MyhandArea;
