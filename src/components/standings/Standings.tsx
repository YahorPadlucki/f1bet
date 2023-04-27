import styled from "styled-components";
import {
    type FC,
    useMemo
} from "react";
import { Driver } from "../../store/reducers/driversReducer";
import DriverStandingRow from "./DriverStandingRow";

const StandingsWrapper = styled.div`
  overflow-y: auto;
  height: 75%;
`;

interface StandingsProps {
    drivers: Driver[];
    onDriverClicked: (value: Driver) => void;
}

const Standings: FC<StandingsProps> = ({drivers, onDriverClicked}) => {
    const sortedDriversData = useMemo(
        () => drivers.sort((a, b) => a.position - b.position),
        [drivers]
    );

    return (
        <StandingsWrapper>
            {sortedDriversData.map((driver) => {
                return (
                    <DriverStandingRow
                        key={driver.driverId}
                        driver={driver}
                        onDriverClicked={onDriverClicked}
                    />
                );
            })}
        </StandingsWrapper>
    );
};
export default Standings;
