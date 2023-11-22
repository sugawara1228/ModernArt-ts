import React, { useState, useRef, useContext }from 'react';
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
import { mainColor, subColor } from '../constants/cssConstants';
import MainBtn from './buttons/MainBtn';
import PlayBtn from './buttons/PlayBtn';
import { ControlPanelProps, UserObj } from '../types/types';
import { Socket } from 'socket.io-client';
import { SocketContext } from '../index';

const ControlPanel: React.FC<ControlPanelProps>= ( props ) => {
    const socket: Socket = useContext(SocketContext);
    const { users } = props;
    const [sliderValue, setSliderValue] = useState<number>(1000);

     /** スライダーでの金額の取得 */
     const handleSliderChange = (value: number) => {
        setSliderValue(value);
    };

    const intervalRef = useRef<NodeJS.Timeout | undefined>(undefined);
    
    /** スライダー - ボタン押下時処理 */
    const minusButtonClick = () => {
        intervalRef.current = setInterval(() => {
            if(sliderValue === 1000) return;
            setSliderValue((prevValue) => {
                const newValue = prevValue - 1000;
                if (newValue >= 1000) {
                    return newValue;
                } else {
                    clearInterval(intervalRef.current);
                    return 1000;
                }
            });
        }, 40);
    };

    /** スライダー + ボタン押下時処理 */
    const plusButtonClick = () => {
        intervalRef.current = setInterval(() => {
            if(sliderValue === 100000) return;
            setSliderValue((prevValue) => {
                const newValue = prevValue + 1000;
                if (newValue <= 100000) {
                    return newValue;
                } else {
                    clearInterval(intervalRef.current);
                    return 100000;
                }
            });
        }, 40);
    };

    const handleStop = () => {
        if (intervalRef.current !== undefined) {
            clearInterval(intervalRef.current);
        }
    };
    
    // カンマを挿入する関数
    const formatNumberWithCommas = (number: number) => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };
  

  return (
        <Flex 
        w="80%" 
        h="20%" 
        bg={mainColor} 
        justify="center" 
        align="center" 
        borderRadius="8px" 
        border="2px solid rgba(255, 255, 255, 0.4)"
        
        > 
            <PlayBtn w="15%" maxW="11rem" mr="1rem" >
                パス
            </PlayBtn>
            <PlayBtn w="22%"  maxW="16rem" mr="2rem">
                入札する
            </PlayBtn>
            <Flex flexDirection="column" justify="center" align="center">
                <Flex w="8rem" h="2.5rem" mx="auto" justify="center" align="center" border="1px solid #FFDCAD" borderRadius="4px" mb="3">
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
                        onChange={handleSliderChange} 
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
            </Flex>
            
        </Flex>
  );
}

export default ControlPanel;