import styled from "styled-components";
import { Driver } from "../../store/reducers/driversReducer";
import {
    Bet,
    selectBetsByDriverId
} from "../../store/reducers/betsReducer";
import { useSelector } from "react-redux";
import { getBetItemBorderColors } from "../bets/betItems/utils";
import { currentLapState } from "../../store/reducers/raceReducer";
import {
    useEffect,
    useState
} from "react";

const StandingsRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.5rem;
  border: 1px solid black;
    cursor: pointer;
`;

const BetStatusIcon = styled.div<{ color: string }>`
display: flex;
align-items: center;
justify-content: center;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background-color: ${({color}) => color};
 color: white;
 font-weight: bold;
`;

interface StandingsRowProps {
    driver: Driver;
    onDriverClicked: (value: Driver) => void;
}

const DriverStandingRow = ({driver, onDriverClicked}: StandingsRowProps) => {

    const bets: Bet[] = useSelector(selectBetsByDriverId(driver.id));
    const currentLap = useSelector(currentLapState);
    let activeBet = bets.find(bet => bet.state === "set");
    let winningBet = bets.find(bet => bet.state === "won");
    const [betIsCloseToOutcome, setBetIsCloseToOutcome] = useState<Bet | undefined>(undefined);
    useEffect(() => {
        const closeToOutcomeBet = bets.find(bet => {
            if (bet.state === "set") {
                switch (bet.type) {
                    case "endOfLap1Place":
                        return currentLap === 1;
                    case "placeOnLap":
                        if(driver.id===2&&bet.onLap===14)
                            console.log("!!!", bet.onLap, currentLap);
                        return bet.onLap === currentLap + 1;
                }
            }
            return false;
        });
        setBetIsCloseToOutcome(closeToOutcomeBet);
    }, [currentLap]);




    const statusColor = (): string => {
        if (!activeBet && !winningBet && !betIsCloseToOutcome) return "grey";

        if (betIsCloseToOutcome) return "orange";
        return winningBet ? getBetItemBorderColors('won').borderColor : getBetItemBorderColors('set').borderColor;
    }

    return (
        <StandingsRow
            onClick={() => onDriverClicked(driver)}
        >
            <BetStatusIcon
                color={statusColor()}
            >{driver.place}

            </BetStatusIcon>

            <div>{driver.name}</div>
            <div>{driver.lapTime}</div>
        </StandingsRow>
    )
}

export default DriverStandingRow;