import React, { useState }from 'react';
import { Flex,} from '@chakra-ui/react';
import { GboxProps } from '../types/types'

const GlassBox:React.FC<GboxProps>= ( props ) => {
    const { w, h, justifyContent } = props;
    const style: React.CSSProperties = {
        width: w || '530px',
        height: h || '550px',
        flexDirection: 'column',
        justifyContent: justifyContent || 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        border: '1px solid rgba(255, 255, 255, 0.4)',
        borderRadius: '8px',
        textAlign: 'center',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 0 10px rgba(248, 68, 157, 0.5)',
        paddingTop: '15px',
    }

  return (
        <Flex style={style}> 
        {props.children}
        </Flex>
  );
}

export default GlassBox;
