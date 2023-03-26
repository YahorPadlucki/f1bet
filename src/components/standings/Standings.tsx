import { DriverData } from "./DriverData";
import styled from "styled-components";
import { FC } from "react";

const StandingsWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const StandingsRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.5rem;
  border: 1px solid black;

`;

interface StandingsProps {
    driversData: DriverData[];
    onDriverClicked: (value: DriverData) => void;
}

const Standings: FC<StandingsProps> = ({driversData,onDriverClicked}) => {
    // Sort the drivers data array by their place ranking
    const sortedDriversData = driversData.sort((a, b) => a.place - b.place);

    return (
        <StandingsWrapper>
            {sortedDriversData.map((driver) => (
                <StandingsRow
                    key={driver.id}
                    onClick={()=>onDriverClicked(driver)}
                >
                    <div>{driver.place}</div>
                    <div>{driver.name}</div>
                    <div>{driver.lapTime}</div>
                </StandingsRow>
            ))}
        </StandingsWrapper>
    );
};
export default Standings;