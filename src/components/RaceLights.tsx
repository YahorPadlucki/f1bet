import React, {
    useState,
    useEffect,
    FC
} from 'react';
import styled from 'styled-components';
import { ModalBackground } from "./Modal";

const RaceLightsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
background-color: white;
border 1px solid black;
padding: 10px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;


const RaceLight = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: ${(props) => (props.color === 'red' ? '#f00' : '#ccc')};
    margin: 5px;
`;

interface Props {
    onLightsOut: () => void;
}

const RaceLights: FC<Props> = ({onLightsOut}) => {
    const [lights, setLights] = useState(['grey', 'grey', 'grey']);
    const [stop, setStop] = useState(false);
    useEffect(() => {
        if (stop) return;
        const interval = setInterval(() => {
            switch (lights.join('')) {
                case 'greygreygrey':
                    setLights(['red', 'grey', 'grey']);
                    break;
                case 'redgreygrey':
                    setLights(['red', 'red', 'grey']);
                    break;
                case 'redredgrey':
                    setLights(['red', 'red', 'red']);
                    break;
                case 'redredred':
                    setLights(['grey', 'grey', 'grey']);
                    setStop(true)
                    onLightsOut();
                    break;
                default:
                    break;
            }
        }, 700);

        return () => clearInterval(interval);
    }, [lights]);

    return (
        <ModalBackground>
            <RaceLightsContainer>
                {lights.map((lightColor, index) => (
                    <RaceLight key={`light-${index}`} color={lightColor}/>
                ))}
            </RaceLightsContainer>
        </ModalBackground>
    );
};


export default RaceLights;
