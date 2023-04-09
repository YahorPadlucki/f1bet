import styled from "styled-components";
import { useState } from "react";
import BetItemToggleInput from "./betItems/BetItemToggleInput";
import BettingChips from "./BettingChips";
import { AppDispatch } from "../../store/Store";
import {
    useDispatch,
    useSelector
} from "react-redux";
import {
    addBet,
    Bet,
    selectBetByType,
    selectBetsByDriverId
} from "../../store/reducers/betsReducer";
import { Driver } from "../../store/reducers/driversReducer";
import { selectedChipValue } from "../../store/reducers/chipsReducer";
import BetItemRangeInput from "./betItems/BetItemRangeInput";

const SetBetsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap:13px;
`;

interface SetBetProps {
    driver: Driver;
}

const DriverBetsList = ({driver}: SetBetProps) => {
    const dispatch: AppDispatch = useDispatch();
    const bets: Bet[] = useSelector(selectBetsByDriverId(driver.id));
    const selectedChip = useSelector(selectedChipValue);


    const podiumFinishBet = useSelector(selectBetByType(driver.id, "podiumFinish"));
    const [podiumFinish, setPodiumFinish] = useState(podiumFinishBet?.podiumFinish || false);

    const endOfLap1PlaceBet = useSelector(selectBetByType(driver.id, "endOfLap1Place"));
    const [endOfLap1Place, setEndOfLap1Place] = useState(1);

    const placeOnLapBet = useSelector(selectBetByType(driver.id, "placeOnLap"));
    const [place, setPlace] = useState(2);
    const [onLap, setOnLap] = useState(2);


    const setEndOfLap1PlaceBet = () => {
        dispatch(addBet({
            driverId: driver.id,
            type: "endOfLap1Place",
            endOfLap1Place: endOfLap1Place,
            betValue: selectedChip,
            state: "set"
        }))
    }

    const setPlaceOnLapBet = () => {
        dispatch(addBet({
            driverId: driver.id,
            type: "placeOnLap",
            place: place,
            onLap: onLap,
            betValue: selectedChip,
            state: "set"
        }))
    }

    const setPodiumFinishBet = () => {
        dispatch(addBet({
            driverId: driver.id,
            type: "podiumFinish",
            podiumFinish: podiumFinish,
            betValue: selectedChip,
            state: "set"
        }))
    }
    return (

        <SetBetsWrapper>
            <label>{driver.name}</label>
            <label>curren lap: 1/53</label>
            <BetItemRangeInput
                label="End of lap 1 place:"
                minValue="1"
                maxValue="20"
                value={endOfLap1PlaceBet?.endOfLap1Place || endOfLap1Place}
                onChange={setEndOfLap1Place}
                onSetBetClicked={setEndOfLap1PlaceBet}
                selectedBetValue={endOfLap1PlaceBet?.state === "set" ? endOfLap1PlaceBet.betValue : selectedChip}
                state={endOfLap1PlaceBet?.state || "default"}
            />

            <BetItemRangeInput
                label="Place:"
                minValue="1"
                maxValue="20"
                value={placeOnLapBet?.place || place}
                onChange={setPlace}
                label2="OnLap:"
                minValue2="1"
                maxValue2="53"
                value2={placeOnLapBet?.onLap || onLap}
                onChange2={setOnLap}
                onSetBetClicked={setPlaceOnLapBet}
                selectedBetValue={placeOnLapBet?.state === "set" ? placeOnLapBet.betValue : selectedChip}
                state={placeOnLapBet?.state || "default"}
            />

            {/*<BetItemRangeInput*/}
            {/*    label="Will pit on lap:"*/}
            {/*    minValue="1"*/}
            {/*    maxValue="53"*/}
            {/*    defaultVal="10"*/}
            {/*    onChange={handlePlacesGainedLostChange}*/}
            {/*    state="active"*/}
            {/*/>*/}

            {/*<BetItemRangeInput*/}
            {/*    label="Gap to leader:"*/}
            {/*    minValue="0"*/}
            {/*    maxValue="210"*/}
            {/*    defaultVal="5"*/}
            {/*    onChange={handlePlacesGainedLostChange}*/}
            {/*    label2="OnLap:"*/}
            {/*    minValue2="1"*/}
            {/*    maxValue2="53"*/}
            {/*    defaultVal2="8"*/}
            {/*    onChange2={handlePlacesGainedLostChange}*/}
            {/*    state="default"*/}
            {/*/>*/}

            <BetItemToggleInput
                label="Podium finish"
                value={podiumFinishBet?.podiumFinish || podiumFinish}
                onChange={setPodiumFinish}
                onSetBetClicked={setPodiumFinishBet}
                selectedBetValue={podiumFinishBet?.state === "set" ? podiumFinishBet.betValue : selectedChip}
                state={podiumFinishBet?.state || "default"}/>
            <BettingChips />
        </SetBetsWrapper>

    );
};

export default DriverBetsList;
