import React, { useState }from 'react';
import { Flex,} from '@chakra-ui/react';
import { GboxProps } from '../types/types'

const GlassBox:React.FC<GboxProps>= ( props ) => {
    const { w, h, justifyContent } = props;
    const style: React.CSSProperties = {
        width: w || '550px',
        height: h || '550px',
        flexDirection: 'column',
        justifyContent: justifyContent || 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '10px',
        textAlign: 'center',
        backdropFilter: 'blur(30px)',
        boxShadow: "10px 10px 30px #df6d04",
        paddingTop: '15px',
    }

  return (
        <Flex style={style}> 
        {props.children}
        </Flex>
  );
}

export default GlassBox;
