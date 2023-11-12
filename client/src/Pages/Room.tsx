import React, { useState, useEffect, useContext, useRef, useCallback } from 'react';
import { Flex, Box, } from '@chakra-ui/react';
import { Socket } from 'socket.io-client';
import { SocketContext } from '../index';
import { useNavigate } from 'react-router-dom';
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
  const chatAreaRef = useRef<HTMLInputElement | null>(null);
  const [sliderValue, setSliderValue] = useState<number>(1000);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const blockBrowserBack = useCallback(() => {
    window.history.go(1)
  }, []);
  
  const addPath: string = window.location.href;
  
    useEffect(() => {
        // サーバーからのメッセージ受信通知
        socket.on('messageReceived', (sendName: string, message: string) => {
            console.log('Received message:', sendName, message);
            setMessageList((prevMessageList) => [...prevMessageList, sendName + ': ' + message]);
            setTimeout(() => {
                if (chatAreaRef.current) {
                  chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
                }
            }, 0);
        });
    

        // サーバーからのルーム入室通知
        socket.on('roomJoined', (room: RoomObj, user: UserObj) => {
            console.log("ユーザーが入室しました。");
            console.log("room:", room);
            console.log("user:", user);
            console.log(messageList);
            setRoomId(user.roomId);
            setUserId(user.userId);
            setUserName(user.name);
            setUsers(room.users);
            setMessageList((prevMessageList) => [...prevMessageList,  'システム: ' + user.name + 'が入室しました。']);
            setJoinedUsers(room.users.length);
            setJoinFlg(true);
            setTimeout(() => {
                if (chatAreaRef.current) {
                  chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
                }
            }, 0);
            setTimeout(() => {
                setIsLoading(false);
            }, 900);
        });

        // サーバーからのルーム退出通知
        socket.on('leaveRoom', (room: RoomObj, user: UserObj) => {
            console.log("ユーザーが退出しました。");
            console.log("room:", room);
            console.log("user:", user);
            console.log(messageList);
            if (user.userId !== socket.id) {
                setMessageList((prevMessageList) => [...prevMessageList, 'システム: ' + user.name + 'が退出しました。']);
            }
            setTimeout(() => {
                if (chatAreaRef.current) {
                  chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
                }
            }, 0);
            setUsers(room.users);
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

    
    /** メッセージ送信 */
    const sendMessage = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if(!message) return;
        socket.emit('sendMessage', message);
        setMessage('');
    }

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

    /** ルーム退出 */
    const leaveRoom = () => {
        socket.emit('leaveRoom');

        // top画面に移動
        navigate('/');
    }

    /** スライダーでの金額の取得 */
    const handleSliderChange = (value: number) => {
        setSliderValue(value);
    };

    const intervalRef = useRef<NodeJS.Timeout | undefined>(undefined);
    
    /** スライダー - ボタン押下時処理 */
    const minusButtonClick = () => {
        intervalRef.current = setInterval(() => {
            if(sliderValue === 1000) return;
            setSliderValue((prevValue) => {
                const newValue = prevValue - 1000;
                if (newValue >= 1000) {
                    return newValue;
                } else {
                    clearInterval(intervalRef.current);
                    return 1000;
                }
            });
        }, 40);
    };

    /** スライダー + ボタン押下時処理 */
    const plusButtonClick = () => {
        intervalRef.current = setInterval(() => {
            if(sliderValue === 100000) return;
            setSliderValue((prevValue) => {
                const newValue = prevValue + 1000;
                if (newValue <= 100000) {
                    return newValue;
                } else {
                    clearInterval(intervalRef.current);
                    return 100000;
                }
            });
        }, 40);
    };

    const handleStop = () => {
        if (intervalRef.current !== undefined) {
            clearInterval(intervalRef.current);
        }
    };

    return (
        <>
        { joinFlg ? (
        
        <Box w="100vw" h="100vh" bg="rgba(66, 68, 86, 0.3)" backdropFilter="blur(12px)">
            { isLoading ? <Loading /> : (
            <>
                <HeaderContent joinedUsers={joinedUsers} leaveRoom={leaveRoom} addPath={addPath}/>
                <Flex height="90vh" justify="center" align="center" py="5" px="5">
                    <Flex h="100%" w="13%"  align="center" flexDirection="column">
                        <UserInfo users={users}/>
                    </Flex>
                    <Flex h="100%" w="67%" justify="center" align="center" flexDirection="column">
                        <ControlPanel 
                        onChange={handleSliderChange} 
                        sliderValue={sliderValue}
                        minusButtonClick={minusButtonClick}
                        plusButtonClick={plusButtonClick}
                        handleStop={handleStop}
                        />
                    </Flex>
                    <Flex h="100%" w="20%" justify="center" align="center" flexDirection="column">
                        <SellingPrice />
                        <ChatArea 
                        roomId={roomId} 
                        messageList={messageList} 
                        sendMessage={sendMessage} 
                        setMessage={setMessage} 
                        inputRef={inputRef}
                        chatAreaRef={chatAreaRef}
                        message={message}
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
            <JoinRoom createFlg={false} joinRoom={joinRoom} nameError={nameError} setUserName={setUserName} />
        </Flex>
        )}
        </>
    );
}

export default Room;
