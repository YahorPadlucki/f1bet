import styled from "styled-components";

interface RaceInfoProps {
    title: string;
    currentLap: number;
    totalLaps: number;
}
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px 0;
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 600;
  text-align: center;
  margin: 0;
`;

const LapInfo = styled.p`
  font-size: 18px;
  text-align: center;
  margin: 10px 0 0;
`;


function RaceInfo({ title, currentLap, totalLaps }: RaceInfoProps) {
    return (
        <Container>
            <Title>{title}</Title>
            <LapInfo>Current Lap: {currentLap}/{totalLaps}</LapInfo>
        </Container>
    );
}

export default RaceInfo;