import styled from "styled-components";
import { Driver } from "../../store/reducers/driversReducer";
import {
    Bet,
    selectBetsByDriverId
} from "../../store/reducers/betsReducer";
import {
    shallowEqual,
    useSelector
} from "react-redux";
import {
    getBetItemBorderColors,
    getTeamColorByDriverId,
    timeToString
} from "../bets/betItems/utils";
import { currentLapState } from "../../store/reducers/raceReducer";
import {
    useEffect,
    useState
} from "react";
import {
    jumpAnimation,
    shakeAnimation
} from "../animations/animationUtils";

const StandingsRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.5rem;
    cursor: pointer;
    
`;

const BetStatusIcon = styled.div<{ color: string, }>`
display: flex;
align-items: center;
justify-content: center;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background-color: ${({color}) => color};
 color: white;
 font-weight: bold;
}

 &.shake {
    animation: ${shakeAnimation} 1.5s ease-in-out infinite;
  }
  
 &.win {
    animation: ${jumpAnimation} 1.5s ease-in-out infinite;
  }
`;

const DriverName = styled.div`
 color: white;
 text-shadow: 1px 1px 0 black, -1px 1px 0 black, 1px -1px 0 black, -1px -1px 0 black;
 padding-left: 0.5rem;
 width: 90%;
 display: flex;
 font-weight: bold;
 align-items: center;
 border-radius: 0px 20px 20px 0px;

`;
const Place = styled.div`
width:5%;
 display: flex;
  justify-content: center;
`;

const Time = styled.div`
width:10%;
text-align: center;
`;


interface StandingsRowProps {
    driver: Driver;
    onDriverClicked: (value: Driver) => void;
}

const anticipationColor = "orange";
const wonColor = getBetItemBorderColors('won').borderColor;
const setColor = getBetItemBorderColors('set').borderColor;

const DriverStandingRow = ({driver, onDriverClicked}: StandingsRowProps) => {

    const bets: Bet[] = useSelector(selectBetsByDriverId(driver.driverId), shallowEqual);
    const currentLap = useSelector(currentLapState);
    let activeBet = bets.find(bet => bet.state === "set");
    let winningBet = bets.find(bet => bet.state === "won");
    const [betIsCloseToOutcome, setBetIsCloseToOutcome] = useState<Bet | undefined>(undefined);
    useEffect(() => {
        const closeToOutcomeBet = bets.find(bet => {
            if (bet.state === "set") {
                switch (bet.type) {
                    case "endOfLap1Place":
                        return currentLap === 0;
                    case "placeOnLap":
                        if (driver.driverId === bet.driverId)
                            return bet.onLap === currentLap + 1;
                        break;
                    case "gapToLeader":
                        if (driver.driverId === bet.driverId)
                            return bet.timeToLeaderOnLap === currentLap + 1;
                }
            }
            return false;
        });
        setBetIsCloseToOutcome(closeToOutcomeBet);
    }, [currentLap,bets]);


    const statusColor = (): string => {
        if (!activeBet && !winningBet && !betIsCloseToOutcome) return "grey";

        if (betIsCloseToOutcome) return anticipationColor;
        return winningBet ? wonColor : setColor;
    }

    return (
        <StandingsRow
            onClick={() => onDriverClicked(driver)}
        >
            <Place>
                <BetStatusIcon
                    color={statusColor()}
                    className={betIsCloseToOutcome ? "shake" : winningBet ? "win" : ""}
                >{driver.position}
                </BetStatusIcon>
            </Place>

            <DriverName
                style={{
                    backgroundImage: `linear-gradient(to right, ${getTeamColorByDriverId(driver.driverId)}, #fff)`,
                }}>{driver.name}</DriverName>
            <Time>{driver.timeToLeader > -1 ? timeToString(driver.timeToLeader) : ""}</Time>
        </StandingsRow>
    )
}

export default DriverStandingRow;