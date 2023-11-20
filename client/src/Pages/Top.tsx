import React, { useState, useEffect, } from 'react';
import { Flex, Box, Heading, Text, Center, Image } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import MainBtn from '../Components/buttons/MainBtn';
import Loading from '../Components/Loading';


const Top: React.FC = () => {

const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 700);
  }, []);

  return (
    <Flex
        height="100vh" // 画面の高さいっぱいにする
        justifyContent="center" // 水平中央に配置
        alignItems="center" // 垂直中央に配置
        flexDirection="column" // 子要素を縦に配置
        >
      {isLoading? <Loading /> : (
        <>
        <Heading as="h1" size="3xl" mb="10">
          <Center>
            <Image src="/img/logo.png" w="600px"/>
          </Center>
        </Heading>
        <Link to="/CreateRoom">
          <MainBtn w="22rem" icon="ok">始める</MainBtn>
        </Link>
        </>
        
      )}
    </Flex>

  );
}

export default Top;
