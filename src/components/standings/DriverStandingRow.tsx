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
    timeToString
} from "../bets/betItems/utils";
import {
    currentLapState,
    totalLapsState
} from "../../store/reducers/raceReducer";
import {
    useEffect,
    useState
} from "react";
import {
    jumpAnimation,
    shakeAnimation
} from "../animations/animationUtils";
import DriverName from "./DriverName";

const StandingsRow = styled.div`
  display: flex;
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

const Place = styled.div`
padding-right: 5px  ;
 display: flex;
  justify-content: center;
  
`;

const Time = styled.div`
text-align: left;
margin-left: -1 rem;
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
    const totalLaps = useSelector(totalLapsState);

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
                        break;
                    case "podiumFinish":
                        if (driver.driverId === bet.driverId)
                            return currentLap === totalLaps - 1;
                }
            }
            return false;
        });
        setBetIsCloseToOutcome(closeToOutcomeBet);
    }, [currentLap, bets]);


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

            <DriverName driverName={driver.name} driverId={driver.driverId}/>
            <Time>{driver.timeToLeader > -1 ? timeToString(driver.timeToLeader) : ""}</Time>
        </StandingsRow>
    )
}

export default DriverStandingRow;