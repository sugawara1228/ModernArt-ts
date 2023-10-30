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
import { useNavigate } from 'react-router-dom';
import { SocketContext } from '../index';
import { userNameValidation } from '../utility/validation';
import Loading from '../Components/Loading';


const CreateRoom: React.FC = () => {
  const socket = useContext(SocketContext);
  const [userName, setUserName] = useState<string>('');
  const [nameError, setNameError] = useState<string>('');
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false); // ローディング完了
    }, 700); // 2秒後にローディング完了と仮定
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
      navigate('/room/' + roomId);
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
        <Text as="b">名前を入力して、ルームを作成してください</Text>
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
          onClick={createRoom}
          colorScheme="yellow"
          w="22rem"
          size="lg"
          border="none"
          mt="35"
        >
          ルームを作成
        </Button>
      </Gbox>
      }
    </Flex>
  );
}

export default CreateRoom;
