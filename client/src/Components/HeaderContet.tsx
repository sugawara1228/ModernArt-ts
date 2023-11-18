import React, { useState, useRef, useEffect, useContext }from 'react';
import { 
    Flex,
    Button,
    Heading,
    Text,
    Center,
    Input,
    Box,
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    AlertDialogCloseButton,
    useDisclosure,
    useClipboard,} from '@chakra-ui/react';
import { HeaderProps } from "../types/types";
import { Socket } from 'socket.io-client';
import { SocketContext } from '../index';
import { useNavigate } from 'react-router-dom';
import { mainColor } from '../constants/cssConstants';
import MainBtn from './MainBtn';

const HeaderContent:React.FC<HeaderProps> = ( props ) => {
  const { joinedUsers} = props;
  const socket: Socket = useContext(SocketContext);
  const navigate = useNavigate();
  const addModal = useDisclosure();
  const leaveModal = useDisclosure();
  const cancelRef = useRef(null);
  const { onCopy, value, setValue, hasCopied } = useClipboard("");

  const addPath: string = window.location.href;

  useEffect(() => {
    setValue(addPath);
  },[]);

    /** ルーム退出 */
    const leaveRoom = () => {
        socket.emit('leaveRoom');
        // top画面に移動
        navigate('/');
    }

  return (
    <Flex height="10%" justify="space-between" align="center" w="100%" p="5">
        <Button onClick={addModal.onOpen} bg="rgba(255, 255, 255, 0.95)" borderRadius="30px" w="10%"
        size="lg">
            <Text as="span" color={mainColor}>
            招待
            <Text as="span" className="material-symbols-outlined" verticalAlign="bottom">
                person
            </Text>
            {joinedUsers}
            </Text>
        </Button>
        
        <AlertDialog
            isOpen={addModal.isOpen}
            leastDestructiveRef={cancelRef}
            onClose={addModal.onClose}
        >
            <AlertDialogOverlay>
            <AlertDialogContent>
                <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                ユーザーを招待
                </AlertDialogHeader>

                <AlertDialogBody>
                    このリンクを送信して、プレイヤーを招待できます。<br />
                    <Input
                    value={value}
                    isReadOnly 
                    w="80%" 
                    />
                </AlertDialogBody>

                <AlertDialogFooter>
                <Button ref={cancelRef} onClick={addModal.onClose}>
                    閉じる
                </Button>
                <Button colorScheme='yellow' onClick={onCopy} ml={3}>
                    {hasCopied ? "コピーしました!" : "Copy"}
                </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>

        <MainBtn onClick={leaveModal.onOpen} icon="logout" w="12rem">
            ルーム退出
        </MainBtn>
        
        <AlertDialog
            isOpen={leaveModal.isOpen}
            leastDestructiveRef={cancelRef}
            onClose={leaveModal.onClose}
        >
            <AlertDialogOverlay>
            <AlertDialogContent>
                <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                ルームの退出
                </AlertDialogHeader>

                <AlertDialogBody>
                    ルームを退出しますか？
                </AlertDialogBody>

                <AlertDialogFooter>
                <Button ref={cancelRef} onClick={leaveModal.onClose}>
                    キャンセル
                </Button>
                <Button onClick={leaveRoom} colorScheme='red'  ml={3}>
                    退出
                </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    </Flex>
  );
}

export default HeaderContent;
