import styled from "styled-components";
import { FC } from "react";
import { Driver } from "../../store/reducers/driversReducer";

const StandingsWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const StandingsRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.5rem;
  border: 1px solid black;
    cursor: pointer;
`;

interface StandingsProps {
    drivers: Driver[];
    onDriverClicked: (value: Driver) => void;
}

const Standings: FC<StandingsProps> = ({drivers, onDriverClicked}) => {
    const sortedDriversData = drivers.sort((a, b) => a.place - b.place);

    return (
        <StandingsWrapper>
            {sortedDriversData.map((driver) => (
                <StandingsRow
                    key={driver.id}
                    onClick={() => onDriverClicked(driver)}
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