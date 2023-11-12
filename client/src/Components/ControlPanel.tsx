import React, { useState }from 'react';
import { 
    Flex,
    Box,
    Text,
    Button,
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    SliderMark,
} from '@chakra-ui/react';
import { ControlPanelProps } from '../types/types';
import { mainColor, subColor } from '../constants/cssConstants';
import MainBtn from './MainBtn';

const ControlPanel:React.FC<ControlPanelProps>= ( props ) => {
    const { onChange, sliderValue, minusButtonClick, plusButtonClick, handleStop } = props;

    // カンマを挿入する関数
    const formatNumberWithCommas = (number: number) => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };
  

  return (
        <Flex w="80%" h="20%" bg={mainColor} justify="center" align="center" borderRadius="8px"> 
            <MainBtn w="11rem" mr="2rem">
                パス
            </MainBtn>
            <MainBtn icon="ok" w="16rem" mr="2rem">
                入札する
            </MainBtn>
            <Box>
                <Flex w="8rem" h="2.5rem" m="auto" mb="7" justify="center" align="center" border="1px solid #FFDCAD" borderRadius="4px">
                    <Text fontSize="20px" color={subColor}>
                        ${formatNumberWithCommas(sliderValue)}
                    </Text>
                </Flex>
                <Flex>

                    <Button 
                        bg="blue.400" 
                        _hover={{ bg: "blue.400" }} 
                        mr="3"
                        position="relative" 
                        onMouseDown={minusButtonClick} 
                        onMouseUp={handleStop} 
                    >
                        <Text as="span" color="white" fontSize="50px" position="absolute" top="40%" left="50%" transform="translate(-50%, -50%)">
                            -
                        </Text>
                    </Button>
                    <Slider 
                        aria-label='slider-ex-1' 
                        value={sliderValue} 
                        defaultValue={1000} 
                        min={1000} 
                        max={100000} 
                        step={1000}  
                        onChange={onChange} 
                        w="20rem"
                    >
                        <SliderTrack height="8px">
                            <SliderFilledTrack bg="blue.300" />
                        </SliderTrack>
                        <SliderThumb 
                            boxSize={6}
                        />
                    </Slider>
                    <Button 
                        bg="red.400" 
                        _hover={{ bg: "red.400" }} 
                        ml="3"
                        position="relative" 
                        onMouseDown={plusButtonClick} 
                        onMouseUp={handleStop} 
                    >
                        <Text as="span" color="white" fontSize="40px" position="absolute" top="40%" left="50%" transform="translate(-50%, -50%)">
                            +
                        </Text>
                    </Button>
                </Flex>
            </Box>
            
        </Flex>
  );
}

export default ControlPanel;