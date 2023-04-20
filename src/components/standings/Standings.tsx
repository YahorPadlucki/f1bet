import styled from "styled-components";
import { FC } from "react";
import { Driver } from "../../store/reducers/driversReducer";
import {
    Bet,
    selectBetsByDriverId
} from "../../store/reducers/betsReducer";
import { useSelector } from "react-redux";
import DriverStandingRow from "./DriverStandingRow";

const StandingsWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;


interface StandingsProps {
    drivers: Driver[];
    onDriverClicked: (value: Driver) => void;
}

const Standings: FC<StandingsProps> = ({drivers, onDriverClicked}) => {
    const sortedDriversData = drivers.sort((a, b) => a.place - b.place);

    return (
        <StandingsWrapper>
            {sortedDriversData.map((driver) => {
                return <DriverStandingRow
                    key={driver.id}
                    driver={driver}
                    onDriverClicked={onDriverClicked}
                />
            })
            }
        </StandingsWrapper>
    );
};
export default Standings;