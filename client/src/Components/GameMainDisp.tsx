import React, { useState, useRef, useEffect, useContext }from 'react';
import { 
    Button,
    Text,
    Input,
    Flex,
    Box,
    Tooltip,
} from '@chakra-ui/react';
import { Socket } from 'socket.io-client';
import { SocketContext } from '../index';
import { mainColor, subColor, color_d, color_g, color_m, color_p, color_v } from '../constants/cssConstants';
import MainBtn from './buttons/MainBtn';
import { GameMainDispProps, UserObj } from '../types/types';
import MyhandArea from './gameDispComponents/MyHandArea';
import ControlPanel from './gameDispComponents/ControlPanel';
import YourInfo from './gameDispComponents/YourInfo';
import { RoomObj } from '../types/types';

/** ゲームメイン画面　コンポーネント ゲームの進行に関する処理はここで行う */
const GameMainDisp:React.FC<GameMainDispProps> = ( props ) => {
    const socket: Socket = useContext(SocketContext);
    const { users } = props;
    const [isCantStart, setIsCantStart] = useState<boolean>(true);
    const [isHost, setIsHost] = useState<boolean>();
    const [ isGameStart, setIsGameStart ] = useState<boolean>(false);

    useEffect(() => {
         // サーバーからのゲームスタート通知時処理
         const gameStartedHandler = (room: RoomObj) => {
            setIsGameStart(true);
        }

        // イベントリスナー登録
        socket.on('gameStarted', gameStartedHandler);

        return () => {
            socket.off('gameStarted', gameStartedHandler);
        }
    },[])
    
    useEffect(() => {
        const myUserObj: UserObj | undefined = users.find((user) => user.userId === socket.id);
        setIsCantStart(users.length < 3);
        setIsHost(myUserObj?.isHost);
    }, [users]);

    const gameStart = () => {
        socket.emit('gameStart');
    }

    return (
        <Flex w="80%" h="100%" justify="center" align="center" flexDirection="column">
            <Flex w="100%" h="60%" justify="center" align="center">
                <Flex flexDirection="column" justify="center" align="center" w="100%" h="100%">
                    <Text as="b" fontSize="21px" color="white" letterSpacing="0.1em">
                        メンバーが集まるのを待っています...
                    </Text>
                    <Text as="b" color="white" mt="3">
                        ※プレイ人数3~5人
                    </Text>
                    { isHost ? (
                        <MainBtn w="40%" icon="ok" mt="3rem" onClick={gameStart} isDisabled={false}>
                            ゲーム開始
                        </MainBtn>
                    ) : null }
                </Flex>
            </Flex>
            <Flex w="100%" h="20%" justify="center" align="center">
                { isGameStart ? (
                <MyhandArea />
                ) : null }
                <YourInfo users={users}/>
            </Flex>
            { isGameStart ? (
            <ControlPanel users={users} />
            ) : null }
        </Flex>
    );
}

export default GameMainDisp;
