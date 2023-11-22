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
import { mainColor, subColor, color_d, color_g, color_m, color_p, color_v } from '../constants/cssConstants';
import MainBtn from './buttons/MainBtn';
import { GameMainDispProps, UserObj } from '../types/types';


/** ゲームメイン画面　コンポーネント */
const GameMainDisp:React.FC<GameMainDispProps> = ( props ) => {
    const socket: Socket = useContext(SocketContext);
    const { users } = props;
    const [isHost, setIsHost] = useState<boolean>();
    
    useEffect(() => {
        const myUserObj: UserObj | undefined = users.find((user) => user.userId === socket.id);
        setIsHost(myUserObj?.isHost);
    }, [users]);

    const gameStart = () => {
        socket.emit('gameStart');
    }

    return (
        <Flex w="80%" h="60%" justify="center" align="center">
            <Flex flexDirection="column" justify="center" align="center" w="100%" h="100%">
                <Text as="b" fontSize="21px" color="white" letterSpacing="0.1em">メンバーが集まるのを待っています...</Text>
                { isHost ? (
                    <MainBtn w="40%" icon="ok" mt="3rem" onClick={gameStart}>
                        ゲーム開始
                    </MainBtn>
                ) : null }
            </Flex>
        </Flex>
    );
}

export default GameMainDisp;
