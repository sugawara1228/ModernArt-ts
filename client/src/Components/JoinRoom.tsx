import React, { useState }from 'react';
import { Text, Spinner, Input, Box } from '@chakra-ui/react';
import Gbox from './parts/GlassBox';
import MainBtn from './buttons/MainBtn';
import { mainColor, subColor } from '../constants/cssConstants';
import { JoinRoomProps } from '../types/types';

/** ルーム入室・作成 */
const JoinRoom: React.FC<JoinRoomProps> = (props) => {

    const { nameError, createRoom, joinRoom, setUserName, createFlg } = props;

  return (
    <Gbox>
        <Text as="b" color={subColor} fontSize="27px" position="absolute" top="4rem">
            {createFlg? "ルームの作成" : "ルームへ入室"}
        </Text>
        {createFlg? (
            <>
            <Text color={subColor}>名前を入力して、ルームを作成してください。</Text>
            <Text color={subColor} mt="1">その後、招待URLからメンバーを招待できます。</Text>
            </>
        ) : (
            <Text color={subColor}>名前を入力して、ルームへ入室してください。</Text>
        )}
        
        <Input
            onChange={e => setUserName(e.target.value)}
            placeholder="ニックネーム"
            w="22rem"
            mt="5"
            bg="rgba(255, 255, 255, 0.9)"
            borderRadius="30px"
            h="2.8rem"
        />
        <Text as="b" color="yellow.300" textAlign="left" w="22rem" mt="1" fontSize="sm">  
            {nameError && 
            <Text mt="5" bg="rgba(255, 255, 255, 0.1)" borderRadius="10px" pt="2" pb="1" px="2">
                <span className="material-symbols-outlined md-18">
                    cancel
                </span>
                <Box as="span" verticalAlign="top" ml="1">
                {nameError}
                </Box>
            </Text>
            }
        </Text>
        {createFlg? (
            <MainBtn onClick={createRoom} icon="ok" mt="3rem">
                ルームを作成
            </MainBtn>
        ) : (
            <MainBtn onClick={joinRoom} icon="ok" mt="3rem">
                ルームに入室
            </MainBtn>
        )}
        
    </Gbox>
  );
}

export default JoinRoom;
