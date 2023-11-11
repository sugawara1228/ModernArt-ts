import React, { useState }from 'react';
import { Flex,} from '@chakra-ui/react';
import { GboxProps } from '../types/types';

const GlassBox:React.FC<GboxProps>= ( props ) => {
    const { w, h, justify,align } = props;
    const style: React.CSSProperties = {
        width: w || '530px',
        height: h || '550px',
        flexDirection: 'column',
        justifyContent: justify || 'center',
        alignItems: align || 'center',
        backgroundColor: 'rgba(66, 68, 86, 0.7)',
        border: '1px solid rgba(255, 255, 255, 0.4)',
        borderRadius: '8px',
        textAlign: 'center',
        backdropFilter: 'blur(10px)',
        paddingTop: '15px',
    }

  return (
        <Flex style={style}> 
        {props.children}
        </Flex>
  );
}

export default GlassBox;
