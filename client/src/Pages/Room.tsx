import React, { useState, useEffect, useContext, useRef, useCallback } from 'react';
import {
  Flex,
  Button,
  Heading,
  Text,
  Center,
  Input,
  Box,
} from '@chakra-ui/react';
import Gbox from '../Components/GlassBox';
import { Socket } from 'socket.io-client';
import { SocketContext } from '../index';
import { useNavigate } from 'react-router-dom';
import { userNameValidation } from '../utility/validation';
import { RoomObj, UserObj } from '../types/types'
import Loading from '../Components/Loading';
import MainBtn from '../Components/MainBtn';
import HeaderContent from '../Components/HeaderContet';
import ChatArea from '../Components/ChatArea';
import SellingPrice from '../Components/SellingPrice';
import UserInfo from '../Components/UserInfo';
import { subColor } from '../constants/cssConstants';

const Room: React.FC = () => {
  const socket: Socket = useContext(SocketContext);
  const [message, setMessage] = useState<string>('');
  const [userId, setUserId] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const [nameError, setNameError] = useState<string>('');
  const [roomId, setRoomId] = useState<string>('');
  const [messageList, setMessageList] = useState<string[]>([]);
  const [users, setUsers ] = useState<UserObj[]>([]);
  const [joinedUsers, setJoinedUsers] = useState<number>(0);
  const [joinFlg, setJoinFlg] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();
  const blockBrowserBack = useCallback(() => {
    window.history.go(1)
  }, []);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  const addPath: string = window.location.href;
  
    useEffect(() => {
        // サーバーからのメッセージ受信通知
        socket.on('messageReceived', (sendName: string, message: string) => {
            setMessageList((prevMessageList) => [...prevMessageList, sendName + ': ' + message]);
        });

        // サーバーからのルーム入室通知
        socket.on('roomJoined', (room: RoomObj, user: UserObj) => {
            setRoomId(user.roomId);
            setUserId(user.userId);
            setUserName(user.name);
            setUsers(room.users);
            setMessageList((prevMessageList) => [...prevMessageList, user.name + 'が入室しました。']);
            setJoinedUsers(room.users.length);
            setJoinFlg(true);
            setTimeout(() => {
                setIsLoading(false);
            }, 900);
        });

        // サーバーからのルーム退出通知
        socket.on('leaveRoom', (room: RoomObj, user: UserObj) => {
            setMessageList((prevMessageList) => [...prevMessageList, user.name + 'が退出しました。']);
            setJoinedUsers(room.users.length);
        });

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
    
    const sendMessage = () => {
        socket.emit('sendMessage', message);
        setMessage('');
        if (inputRef.current) {
            inputRef.current.value = '';
        }
    };

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

    const leaveRoom = () => {
        socket.emit('leaveRoom');

        // top画面に移動
        navigate('/');
    }

    return (
        <>
        { joinFlg ? (
        
        <Box w="100vw" h="100vh" bg="rgba(66, 68, 86, 0.1)" backdropFilter="blur(12px)">
            { isLoading ? <Loading /> : (
            <>
                <HeaderContent joinedUsers={joinedUsers} leaveRoom={leaveRoom} addPath={addPath}/>
                
                <Text color={subColor}>{JSON.stringify(users)}</Text>
                <Flex height="90vh" justifyContent="center" alignItems="center" py="5" px="10">
                    <Flex h="100%" w="20%" justifyContent="center" alignItems="center" flexDirection="column">
                        <UserInfo users={users}/>
                    </Flex>
                    <Flex h="100%" w="20%" justifyContent="center" alignItems="center" flexDirection="column">
                        <SellingPrice />
                        <ChatArea 
                        roomId={roomId} 
                        messageList={messageList} 
                        sendMessage={sendMessage} 
                        setMessage={setMessage} 
                        inputRef={inputRef}
                        />
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
            <Gbox>
                <Text as="b">名前を入力して、ルームに入室してください</Text>
                <Input
                onChange={e => setUserName(e.target.value)}
                placeholder="ニックネーム"
                w="22rem"
                mt="5"
                />
                <Text color="red" textAlign="left" w="22rem" mt="1" fontSize="sm">
                    
                    {nameError && 
                    <Text mt="1">
                        <span className="material-symbols-outlined md-18">
                            cancel
                        </span>
                        <Box as="span" verticalAlign="top" ml="1">
                        {nameError}
                        </Box>
                    </Text>
                    }
                </Text>
                <Button
                onClick={joinRoom}
                colorScheme="yellow"
                w="22rem"
                size="lg"
                border="none"
                mt="35"
                >
                ルームに入室
                </Button>
            </Gbox>
        </Flex>
        )}
        </>
    );
}

export default Room;
