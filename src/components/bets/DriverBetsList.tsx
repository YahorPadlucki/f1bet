import styled from "styled-components";
import {
    useEffect,
    useState
} from "react";
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
    removeBet,
    selectBetByType,
    selectBetsByDriverId,
    updateBet
} from "../../store/reducers/betsReducer";
import {
    Driver,
    totalDriversState
} from "../../store/reducers/driversReducer";
import { selectedChipValue } from "../../store/reducers/chipsReducer";
import BetItemRangeInput from "./betItems/BetItemRangeInput";
import {
    currentLapState,
    lapsLeftState,
    totalLapsState
} from "../../store/reducers/raceReducer";
import { BetState } from "../../types/BetTypes";
import {
    endOfLap1MultiplayerState,
    placeOnLapMultiplayerState,
    podiumFinishedMultiplayerState,
    updateEndOfLap1MultiplayerAction,
    updatePlaceOnLapMultiplayerAction,
    updatePodiumFinishedMultiplayerAction
} from "../../store/reducers/multiplayerReducer";
import {
    decreaseBalance,
    increaseBalance
} from "../../store/reducers/balanceReducer";

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
    const currentLap = useSelector(currentLapState);
    const totalLaps = useSelector(totalLapsState);
    const lapsLeft = useSelector(lapsLeftState);
    const totalDrivers = useSelector(totalDriversState);

    const podiumFinishMultiplier = useSelector(podiumFinishedMultiplayerState);
    const endOfLap1Multiplier = useSelector(endOfLap1MultiplayerState);
    const placeOnLapMultiplayer = useSelector(placeOnLapMultiplayerState);

    const podiumFinishBet = useSelector(selectBetByType(driver.id, "podiumFinish"));
    const [podiumFinish, setPodiumFinish] = useState(podiumFinishBet?.podiumFinish || false);

    const endOfLap1PlaceBet = useSelector(selectBetByType(driver.id, "endOfLap1Place"));
    const [endOfLap1Place, setEndOfLap1Place] = useState(driver.place);

    const placeOnLapBet = useSelector(selectBetByType(driver.id, "placeOnLap"));
    const [place, setPlace] = useState(2);
    const [onLap, setOnLap] = useState(2);

    useEffect(() => {
        updateEndOfLap1Multiplayer();
    }, [endOfLap1Place])

    useEffect(() => {
        updatePlaceOnLapMultiplayer();
    }, [place, onLap])

    useEffect(() => {
        updatePodiumFinishMultiplayer();
        setOnLap(currentLap + 1);
    }, [currentLap])


    const onendOfLap1PlaceChange = (value: number) => {
        setEndOfLap1Place(value);
    }

    function updateEndOfLap1Multiplayer() {
        dispatch(updateEndOfLap1MultiplayerAction({
            currentPlace: driver.place,
            betPlace: endOfLap1Place,
        }));
    }

    function updatePodiumFinishMultiplayer() {
        dispatch(updatePodiumFinishedMultiplayerAction({
            currentLap: currentLap,
            totalLaps: totalLaps,
            driverPosition: driver.place,
        }));
    }

    function updatePlaceOnLapMultiplayer() {
        dispatch(updatePlaceOnLapMultiplayerAction({
            currentPlace: driver.place,
            betPlace: place,
            currentLap: currentLap,
            betLap: onLap
        }));
    }


    const setEndOfLap1PlaceBet = () => {
        dispatch(decreaseBalance({amount: selectedChip}));
        dispatch(addBet({
            driverId: driver.id,
            type: "endOfLap1Place",
            endOfLap1Place: endOfLap1Place,
            betValue: selectedChip,
            betMultiplayer: endOfLap1Multiplier,
            state: "set"
        }))
    }

    const setPlaceOnLapBet = () => {
        dispatch(decreaseBalance({amount: selectedChip}));
        dispatch(addBet({
            driverId: driver.id,
            type: "placeOnLap",
            place: place,
            onLap: onLap,
            betValue: selectedChip,
            betMultiplayer: placeOnLapMultiplayer,
            state: "set"
        }))
    }

    const setPodiumFinishBet = () => {
        dispatch(decreaseBalance({amount: selectedChip}));
        dispatch(addBet({
            driverId: driver.id,
            type: "podiumFinish",
            podiumFinish: podiumFinish,
            betValue: selectedChip,
            betMultiplayer: podiumFinishMultiplier,
            state: "set"
        }))
    }

    function onEndOfLap1WinCollectClicked(): void {
        dispatch(increaseBalance({amount: endOfLap1PlaceBet!.winValue as number}));
        dispatch(removeBet({
            driverId: driver.id,
            type: "endOfLap1Place"
        }))
    }

    function onPlaceOnLapWinCollectClicked(): void {
        dispatch(increaseBalance({amount: placeOnLapBet!.winValue as number}));
        dispatch(removeBet({
            driverId: driver.id,
            type: "placeOnLap"
        }))
    }

    function onPodiumFinishWinCollectClicked(): void {

    }

    function getPodiumFinishState(): BetState {
        return podiumFinishBet?.state ? podiumFinishBet.state : lapsLeft > 5 ? "default" : "disabled";
    }

    function getEndOfLap1State(): BetState {
        return endOfLap1PlaceBet?.state ? endOfLap1PlaceBet.state : currentLap > 1 ? "disabled" : "default";
    }

    function getPlaceOnLapState(): BetState {
        return placeOnLapBet?.state || "default";
    }

    return (

        <SetBetsWrapper>
            <label>{driver.name}</label>
            <label>curren lap: {currentLap}/{totalLaps}</label>
            <BetItemRangeInput
                label="End of lap 1 place:"
                minValue={1}
                maxValue={totalDrivers}
                value={endOfLap1PlaceBet?.endOfLap1Place || endOfLap1Place}
                onChange={onendOfLap1PlaceChange}
                onSetBetClicked={setEndOfLap1PlaceBet}
                selectedBetValue={endOfLap1PlaceBet?.state === "set" ? endOfLap1PlaceBet.betValue : selectedChip}
                state={getEndOfLap1State()}
                multiplier={endOfLap1Multiplier}
                winValue={endOfLap1PlaceBet?.winValue || 0}
                onWinCollectClicked={onEndOfLap1WinCollectClicked}
            />

            <BetItemRangeInput
                label="Place:"
                minValue={1}
                maxValue={totalDrivers}
                value={placeOnLapBet?.place || place}
                onChange={setPlace}
                label2="OnLap:"
                minValue2={currentLap + 1}
                maxValue2={totalLaps}
                value2={placeOnLapBet?.onLap || onLap}
                onChange2={setOnLap}
                onSetBetClicked={setPlaceOnLapBet}
                selectedBetValue={placeOnLapBet?.state === "set" ? placeOnLapBet.betValue : selectedChip}
                state={getPlaceOnLapState()}
                multiplier={placeOnLapMultiplayer}
                winValue={placeOnLapBet?.winValue || 0}
                onWinCollectClicked={onPlaceOnLapWinCollectClicked}
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
                multiplier={podiumFinishMultiplier}
                winValue={podiumFinishBet?.winValue || 0}
                selectedBetValue={podiumFinishBet?.state === "set" ? podiumFinishBet.betValue : selectedChip}
                state={getPodiumFinishState()}
                onWinCollectClicked={onPodiumFinishWinCollectClicked}/>
            <BettingChips/>
        </SetBetsWrapper>

    );
};

export default DriverBetsList;
