import React, { useState }from 'react';
import { Box, Button, Text} from '@chakra-ui/react';
import { BtnProps } from "../types/types";
import { mainColor } from '../constants/cssConstants';

const MainBtn:React.FC<BtnProps> = ( props ) => {
  const { w, onClick} = props;

  return (
    <Button onClick={onClick} w={w || "22rem"} size="lg" borderRadius="30px" bg="rgba(255, 255, 255, 0.95)" mt="3rem">
      <Box w="2.1rem" h="2.1rem" borderRadius="50%" bg={ mainColor } display="flex" alignItems="center" justifyContent="center" position="absolute" left="5">
        <Box w="1.4rem" h="1.4rem" borderRadius="50%" border="2px solid #FFDCAD" />
      </Box>
      <Text as="span" color={ mainColor }>
        {props.children}
      </Text>
    </Button>
  );
}

export default MainBtn;
