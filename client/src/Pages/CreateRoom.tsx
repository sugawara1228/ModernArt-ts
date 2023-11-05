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
import JoinRoom from '../Components/JoinRoom';


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
        <JoinRoom createFlg={true} createRoom={createRoom} nameError={nameError} setUserName={setUserName} />
      }
    </Flex>
  );
}

export default CreateRoom;
