import styled from "styled-components";

interface RaceInfoProps {
    title: string;
    currentLap: number;
    totalLaps: number;
}

const Container = styled.div`
  top: 0;
  padding: 20px 0;
  height: 10%;

  position: relative;
`;

const Background = styled.div`
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-image: url('./austBack.png'); 
  background-size: cover;
  background-position: center;
  filter: brightness(50%);
`;

const Title = styled.h1`
  font-size: 32px;
  text-align: center;
color: #FFFFFF;
  margin: 0;
`;

const LapInfo = styled.p`
  font-size: 19px;
  text-align: center;
  color: #FFFFFF;
  margin: 10px 0 0;
`;


function RaceInfo({title, currentLap, totalLaps}: RaceInfoProps) {
    return (
        <Container>
            <Title>{title}</Title>
            <LapInfo>Current Lap: {currentLap}/{totalLaps}</LapInfo>
            <Background/>
        </Container>
    );
}

export default RaceInfo;