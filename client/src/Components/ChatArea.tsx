import React, { useState, useRef, useEffect, useContext }from 'react';
import { 
    Button,
    Text,
    Input,
    Box,
    FormControl,
} from '@chakra-ui/react';
import { Socket } from 'socket.io-client';
import { SocketContext } from '../index';
import { mainColor, subColor } from '../constants/cssConstants';
import { RoomObj, UserObj } from '../types/types';
import Gbox from './GlassBox';

/** チャットエリアコンポーネント */
const ChatArea:React.FC = () => {
    const socket: Socket = useContext(SocketContext);
    const [message, setMessage] = useState<string>('');
    const [messageList, setMessageList] = useState<string[]>([]);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const chatAreaRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {

        // サーバーからのメッセージ受信時処理
        const messageReceivedHandler = (sendName: string, message: string) => {
            console.log('Received message:', sendName, message);
            setMessageList((prevMessageList) => [...prevMessageList, sendName + ': ' + message]);
            setTimeout(() => {
                if (chatAreaRef.current) {
                  chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
                }
            }, 0);
        };

        // サーバーからのルーム入室通知時処理
        const roomJoinedMessageHandler = (user: UserObj) => {
            setMessageList((prevMessageList) => [...prevMessageList,  'システム: ' + user.name + 'が入室しました。']);
            setTimeout(() => {
                if (chatAreaRef.current) {
                  chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
                }
            }, 0);
        };

         // サーバーからのルーム退出通知時処理
         const leaveRoomMessageHandler = (user: UserObj) => {
            console.log(messageList);
            if (user.userId !== socket.id) {
                setMessageList((prevMessageList) => [...prevMessageList, 'システム: ' + user.name + 'が退出しました。']);
            }
            setTimeout(() => {
                if (chatAreaRef.current) {
                  chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
                }
            }, 0);
        };

        // リスナーを登録
        socket.on('messageReceived', messageReceivedHandler);
        socket.on('leaveRoomMessage', leaveRoomMessageHandler);
        socket.on('roomJoinedMessage', roomJoinedMessageHandler);

        // クリーンアップ処理
        return () => {
            socket.off('messageReceived', messageReceivedHandler);
            socket.off('leaveRoomMessage', leaveRoomMessageHandler);
            socket.off('roomJoinedMessage', roomJoinedMessageHandler);
        };
    });

    /** メッセージ送信 */
    const sendMessage = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if(!message) return;
        socket.emit('sendMessage', message);
        setMessage('');
    }

  return (
    <Gbox w="100%" h="60%" justify="flex-start" align="center">
        <Text color="rgba(255, 255, 255, 0.7)" mb="2rem">Game log</Text>
        <Box className="chat" w="90%" h="65%" maxH="70%" overflowY="scroll" ref={chatAreaRef} paddingLeft="5" fontSize="14px">
            {messageList.map((messageContent, index) => {
                // メッセージの内容を分割して名前と本文に分ける
                const [sendName, message] = messageContent.split(':');
                
                // メッセージ本文のスタイル
                const messageStyle = sendName === "システム" ? "blue.100" : "white";

                return (
                <Text key={index} textAlign="left">
                    {sendName === "システム" ? null : (
                    <Text as="span" textAlign="left" color={subColor}> {sendName}: </Text>
                    )}
                    <Text as="span" textAlign="left" color={messageStyle}> {message}</Text>
                </Text>
                );
            })}
        </Box>
        <Box position="absolute" bottom="1" w="100%">
            <Box position="relative">
            <form onSubmit={sendMessage}>
                <Input
                onChange={e => setMessage(e.target.value)}
                ref={inputRef}
                value={message}
                w="75%"
                mt="5"
                mb="35"
                border="none"
                bg="rgba(255, 255, 255, 0.8)"
                borderRadius="30px"
                fontSize="14px"
                z-index="100"
                />
                <Button
                type="submit"
                position="absolute"
                right="10%"
                top="38%"
                transform="translateY(-38%)"
                bg="none"
                zIndex="101"
                _hover={{ bg: 'none' }}
                >
                <span className="material-symbols-outlined green">send</span>
                </Button>
                </form>
            </Box>
        </Box>
    </Gbox>
  );
}

export default ChatArea;
