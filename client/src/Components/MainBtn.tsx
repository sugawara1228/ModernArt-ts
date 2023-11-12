import React, { useState }from 'react';
import { Box, Button, Text} from '@chakra-ui/react';
import { BtnProps } from "../types/types";
import { mainColor, subColor } from '../constants/cssConstants';

const MainBtn:React.FC<BtnProps> = ( props ) => {
  const { w, onClick, icon, mt, mb, ml, mr} = props;

  return (
    <Button onClick={onClick} w={w || "22rem"} size="lg" borderRadius="30px" bg="rgba(255, 255, 255, 0.9)" mt={mt} mb={mb} ml={ml} mr={mr}>
      {icon === "ok" ? (
      <Box 
        w="2.1rem" 
        h="2.1rem" 
        borderRadius="50%" 
        bg={ mainColor } 
        display="flex" 
        alignItems="center" 
        justifyContent="center" 
        position="absolute" 
        left="5"
      >
        <Box w="1.4rem" h="1.4rem" borderRadius="50%" border="2px solid #FFDCAD" />
      </Box>
      ) : icon === "logout" ? (
          <span className="material-symbols-outlined mr-1">
            
          </span>
      ) : null
      }
      <Text as="span" color={ mainColor }>
        {props.children}
      </Text>
    </Button>
  );
}

export default MainBtn;
