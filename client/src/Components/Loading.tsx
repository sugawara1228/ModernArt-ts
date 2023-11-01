import React, { useState }from 'react';
import { Text, Spinner, } from '@chakra-ui/react';

/** ローディング画面 */
const Loading = () => {

  return (
    <Text 
    as="b" 
    opacity="0.9" 
    color="white"
    position="absolute"
    top="50%"
    left="50%"
    transform="translate(-50%, -50%)" 
    >
    <Spinner mr="2" /> サーバーからデータを取得中...
    </Text>
  );
}

export default Loading;
