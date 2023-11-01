import React, { useState, useEffect, useContext } from 'react';
import {
  Flex,
  Button,
  Heading,
  Text,
  Center,
  Input,
  Box,
  Spinner,
} from '@chakra-ui/react';
import Gbox from '../Components/GlassBox';
import { Socket } from 'socket.io-client';
import { useNavigate } from 'react-router-dom';
import { SocketContext } from '../index';
import { userNameValidation } from '../utility/validation';
import Loading from '../Components/Loading';
import MainBtn from '../Components/MainBtn';
import { mainColor, subColor } from '../constants/cssConstants';


const CreateRoom: React.FC = () => {
  const socket: Socket = useContext(SocketContext);
  const [userName, setUserName] = useState<string>('');
  const [nameError, setNameError] = useState<string>('');
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 700);
  }, []);

  const createRoom = () => {
    
    if(userNameValidation(userName)) {
      // 入力チェック
      setNameError(userNameValidation(userName));
    } else {
      // ランダムなルームIDを生成
      const roomId = randomRoomIdCreate();
      // ルーム作成API呼び出し
      socket.emit('createRoom', roomId, userName);

      // メイン画面に移動
      navigate(`/room/${roomId}`);
    }
    
  };

  const randomRoomIdCreate = () => {
    return (
      new Date().getTime().toString(16) + Math.floor(Math.random()).toString(16)
    );
  };

  return (
    <Flex
      height="100vh"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      {isLoading? <Loading />:
      <Gbox>
        <Text as="b" color={subColor} fontSize="27px" position="absolute" top="4rem">ルームの作成</Text>
        <Text color={subColor}>名前を入力して、ルームを作成してください。</Text>
        <Text color={subColor} mt="1">その後、招待URLからメンバーを招待できます。</Text>
        <Input
          onChange={e => setUserName(e.target.value)}
          placeholder="ニックネーム"
          w="22rem"
          mt="5"
          bg="rgba(255, 255, 255, 0.9)"
          borderRadius="30px"
          h="2.8rem"
        />
        <Text color="red.500" textAlign="left" w="22rem" mt="1" fontSize="sm">  
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
        <MainBtn onClick={createRoom} >
          ルームを作成
        </MainBtn>
      </Gbox>
      }
    </Flex>
  );
}

export default CreateRoom;
