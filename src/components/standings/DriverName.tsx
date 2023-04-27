import React, { FC } from 'react';
import styled from 'styled-components';
import { getTeamColorByDriverId } from "../bets/betItems/utils";

const DriverNameDiv = styled.div`
 color: white;
 text-shadow: 1px 1px 0 black, -1px 1px 0 black, 1px -1px 0 black, -1px -1px 0 black;
 padding-left: 0.5rem;
 width: 90%;
 display: flex;
 font-weight: bold;
 align-items: center;
 border-radius: 0px 20px 20px 0px;
`;

interface Props {
    driverName: string;
    driverId: string;
}

const DriverName: FC<Props> = ({driverName, driverId}) => {
    return (
        <DriverNameDiv
            style={{
                backgroundImage: `linear-gradient(to right, ${getTeamColorByDriverId(driverId)}, #fff)`,
            }}>{driverName}</DriverNameDiv>
    );
};

export default DriverName;