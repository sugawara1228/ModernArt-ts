import React, { useState, useRef, useEffect }from 'react';
import { 
    Button,
    Text,
    Input,
    Box,
    FormControl,
} from '@chakra-ui/react';
import { ChatAreaProps } from "../types/types";
import { mainColor, subColor } from '../constants/cssConstants';
import Gbox from './GlassBox';

/** チャットエリアコンポーネント */
const ChatArea:React.FC<ChatAreaProps> = ( props ) => {
    const { roomId, messageList, sendMessage, setMessage, inputRef, chatAreaRef, message } = props;

  return (
    <Gbox w="100%" h="60%" justifyContent="flex-start">
        <Text color="rgba(255, 255, 255, 0.7)" mb="2rem">Game log</Text>
        <Box className="chat" w="90%" h="70%" maxH="70%" overflowY="scroll" ref={chatAreaRef}>
            {messageList.map((messageContent, index) => {
                return <Text key={index} color={subColor}> {messageContent}</Text>;
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
