import React, { useState, useEffect, useContext, useRef, useCallback } from 'react';
import { Flex, Box, } from '@chakra-ui/react';
import { Socket } from 'socket.io-client';
import { SocketContext } from '../index';
import { userNameValidation } from '../utility/validation';
import { RoomObj, UserObj } from '../types/types';
import Loading from '../Components/Loading';
import HeaderContent from '../Components/HeaderContet';
import ChatArea from '../Components/ChatArea';
import SellingPrice from '../Components/SellingPrice';
import UserInfo from '../Components/UserInfo';
import { subColor } from '../constants/cssConstants';
import JoinRoom from '../Components/JoinRoom';
import ControlPanel from '../Components/ControlPanel';
import YourInfo from '../Components/YourInfo';
import GameMainDisp from '../Components/GameMainDisp';
import MyhandArea from '../Components/MyHandArea';

const Room: React.FC = () => {
  const socket: Socket = useContext(SocketContext);
  const [userName, setUserName] = useState<string>('');
  const [nameError, setNameError] = useState<string>('');
  const [users, setUsers ] = useState<UserObj[]>([]);
  const [joinedUsers, setJoinedUsers] = useState<number>(0);
  const [joinFlg, setJoinFlg] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isDisconnect, setIsDisconnect] = useState<boolean>(false);
  const [ isGameStart, setIsGameStart ] = useState<boolean>(false);
  const blockBrowserBack = useCallback(() => {
    window.history.go(1)
  }, []);
  
    useEffect(() => {
        // サーバーからのルーム入室通知時処理
        const roomJoinedHandler = (room: RoomObj, user: UserObj) => {
            setUserName(user.name);
            setUsers(room.users);
            setJoinedUsers(room.users.length);
            setJoinFlg(true);
            setTimeout(() => {
                setIsLoading(false);
            }, 900);
        };

        // サーバーからのルーム退出通知時処理
        const leaveRoomHandler = (room: RoomObj, user: UserObj) => {
            setUsers(room.users);
            setJoinedUsers(room.users.length);
        };

        // 定員オーバー通知時処理
        const capacityOverHandler = () => {
            setNameError('このルームは定員に達しています');
        }

        // サーバーからのゲームスタート通知時処理
        const gameStartedHandler = (room: RoomObj) => {
            setIsGameStart(true);
        }

        // リスナーを登録
        socket.on('roomJoined', roomJoinedHandler);
        socket.on('leaveRoom', leaveRoomHandler);
        socket.on('capacityOver', capacityOverHandler);
        socket.on('gameStarted', gameStartedHandler);

        return () => {
            socket.off('roomJoined', roomJoinedHandler);
            socket.off('leaveRoom', leaveRoomHandler);
            socket.off('capacityOver', capacityOverHandler);
            socket.off('gameStarted', gameStartedHandler);
        };

    },[]);  

    /** ブラウザバックの禁止 */
    useEffect(() => {
        // 直前の履歴に現在のページを追加
        window.history.pushState(null, '', window.location.href)
    
        // 直前の履歴と現在のページのループ
        window.addEventListener('popstate', blockBrowserBack)
    
        // クリーンアップ
        return () => {
            window.removeEventListener('popstate', blockBrowserBack)
        }
    }, [blockBrowserBack]);


    /** ルーム入室 */
    const joinRoom = () => {
        if(userNameValidation(userName)) {
            // 入力チェック
            setNameError(userNameValidation(userName));
        } else {
            // 現在いるパスからroomIdを取り出してroomに入室する
            const currentPath: string = window.location.pathname;
            const pathSegments: string[] = currentPath.split('/');
            const roomId: string = pathSegments[pathSegments.length - 1];

            socket.emit('joinRoom', roomId, userName);
         } 
    }

    return (
        <>
        { joinFlg ? (
        
        <Box w="100vw" h="100vh" bg="rgba(66, 68, 86, 0.3)" backdropFilter="blur(12px)">
            { isDisconnect ? (
                <Flex h="100%" w="100%" justify="center" align="center" bg="rgba(0,0,0,0.7)">
                    <Box h="6rem" w="14rem">
                        通信が切断されました。
                    </Box>
                </Flex>
            ) : null }
            { isLoading ? <Loading /> : (
            <>
                <HeaderContent joinedUsers={joinedUsers}/>
                <Flex height="90vh" justify="center" align="center" py="5" px="5">
                    {/** User情報エリア */}
                    <Flex h="100%" w="13%"  align="center" flexDirection="column">
                        <UserInfo users={users}/>
                    </Flex>
                    {/** Mainエリア */}
                    <Flex h="100%" w="67%" justify="center" align="center" flexDirection="column">
                        <GameMainDisp users={users} />
                        <Flex w="80%" h="20%" justify="center" align="center">
                            { isGameStart ? (
                            <MyhandArea />
                            ) : null }
                            <YourInfo users={users}/>
                        </Flex>
                        { isGameStart ? (
                        <ControlPanel users={users} />
                        ) : null }
                    </Flex>
                    {/** Chat&Price情報エリア */}
                    <Flex h="100%" w="20%" justify="center" align="center" flexDirection="column">
                        <SellingPrice />
                        <ChatArea />
                    </Flex>
                </Flex>
            </>
            )}
        </Box>
        ) : (
        <Flex
        height="100vh"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        >
            <JoinRoom createFlg={false} joinRoom={joinRoom} nameError={nameError} setUserName={setUserName} />
        </Flex>
        )}
        </>
    );
}

export default Room;
