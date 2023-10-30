import React, { useState }from 'react';
import { Text, Spinner, } from '@chakra-ui/react';

/** ローディング画面 */
const Loading = () => {

  return (
    <Text as="b" opacity="0.9">
        <Spinner mr="2" /> サーバーからデータを取得中...
    </Text>
  );
}

export default Loading;
