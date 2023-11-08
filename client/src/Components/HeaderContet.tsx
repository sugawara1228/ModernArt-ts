import React, { useState, useRef, useEffect }from 'react';
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
import { mainColor } from '../constants/cssConstants';

const HeaderContent:React.FC<HeaderProps> = ( props ) => {
  const { joinedUsers, leaveRoom, addPath } = props;
  const addModal = useDisclosure();
  const leaveModal = useDisclosure();
  const cancelRef = useRef(null);
  const { onCopy, value, setValue, hasCopied } = useClipboard("");

  useEffect(() => {
    setValue(addPath);
  },[]);

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
            <Button onClick={leaveModal.onOpen} bg="rgba(255, 255, 255, 0.95)" borderRadius="30px" w="10rem"
                size="lg" color={mainColor}>
                    ルーム退出
            </Button>
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
