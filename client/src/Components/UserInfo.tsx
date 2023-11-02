import React, { useState, useRef, useEffect, useContext }from 'react';
import { 
    Button,
    Text,
    Input,
    Box,
} from '@chakra-ui/react';
import { Socket } from 'socket.io-client';
import { SocketContext } from '../index';
import { UserInfoProps } from "../types/types";
import { mainColor, subColor } from '../constants/cssConstants';
import Gbox from './GlassBox';


/** ユーザー情報エリア　コンポーネント */
const UserInfo:React.FC<UserInfoProps> = ( props ) => {
    const { users } = props;
    const socket: Socket = useContext(SocketContext);

    return (
        <>
        {users.map((user, index) => (
            user.userId === socket.id ? null : (
                <Gbox w="100%" h="20%" justifyContent="flex-start">
                    <Text key={user.userId} color={subColor}>{user.name}</Text>
                </Gbox>
            )
        ))}
        </>
    );
}

export default UserInfo;
