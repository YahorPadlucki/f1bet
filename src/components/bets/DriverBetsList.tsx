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
    selectBetsByDriverId
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
    gapOnLapMultiplayerState,
    placeOnLapMultiplayerState,
    podiumFinishedMultiplayerState,
    updateEndOfLap1MultiplayerAction,
    updateGapOnLapMultiplayerAction,
    updatePlaceOnLapMultiplayerAction,
    updatePodiumFinishedMultiplayerAction
} from "../../store/reducers/multiplayerReducer";
import {
    decreaseBalance,
    increaseBalance
} from "../../store/reducers/balanceReducer";
import DriverName from "../standings/DriverName";
import BetItemFixedEvent from "./betItems/BetItemFixedEvent";

const SetBetsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  gap:10px;
`;

interface SetBetProps {
    driver: Driver;
}

function lapsEnoughToBet(lapsLeft: number): boolean {
    return lapsLeft > 5;
}


const DriverBetsList = ({driver}: SetBetProps) => {
    const dispatch: AppDispatch = useDispatch();
    const bets: Bet[] = useSelector(selectBetsByDriverId(driver.driverId));

    const selectedChip = useSelector(selectedChipValue);
    const currentLap = useSelector(currentLapState);
    const totalLaps = useSelector(totalLapsState);
    const lapsLeft = useSelector(lapsLeftState);
    const totalDrivers = useSelector(totalDriversState);

    const podiumFinishMultiplier = useSelector(podiumFinishedMultiplayerState);
    const endOfLap1Multiplier = useSelector(endOfLap1MultiplayerState);
    const placeOnLapMultiplayer = useSelector(placeOnLapMultiplayerState);
    const gapOnLapMultiplayer = useSelector(gapOnLapMultiplayerState);

    const podiumFinishBet = useSelector(selectBetByType(driver.driverId, "podiumFinish"));

    const endOfLap1PlaceBet = useSelector(selectBetByType(driver.driverId, "endOfLap1Place"));
    const [endOfLap1Place, setEndOfLap1Place] = useState(driver.position);

    const placeOnLapBet = useSelector(selectBetByType(driver.driverId, "placeOnLap"));
    const [place, setPlace] = useState(2);
    const [onLap, setOnLap] = useState(2);

    const gapOnLapBet = useSelector(selectBetByType(driver.driverId, "gapToLeader"));
    const [gap, setGap] = useState(5);
    const [gapOnLap, setGapOnLap] = useState(5);


    useEffect(() => {
        updateEndOfLap1Multiplayer();
    }, [endOfLap1Place])

    useEffect(() => {
        updatePlaceOnLapMultiplayer();
    }, [place, onLap])

    useEffect(() => {
        updatePodiumFinishMultiplayer();
        if (lapsEnoughToBet(lapsLeft)) {
            setOnLap(currentLap + 1);
            setGapOnLap(currentLap + 1);
        }
    }, [currentLap])

    useEffect(() => {
        updateGapOnLapMultiplayer();
    }, [gapOnLap, gap])


    const onendOfLap1PlaceChange = (value: number) => {
        setEndOfLap1Place(value);
    }

    function updateEndOfLap1Multiplayer() {
        dispatch(updateEndOfLap1MultiplayerAction({
            currentPlace: driver.position,
            betPlace: endOfLap1Place,
        }));
    }

    function updatePodiumFinishMultiplayer() {
        dispatch(updatePodiumFinishedMultiplayerAction({
            currentLap: currentLap,
            totalLaps: totalLaps,
            driverPosition: driver.position,
        }));
    }

    function updatePlaceOnLapMultiplayer() {
        dispatch(updatePlaceOnLapMultiplayerAction({
            currentPlace: driver.position,
            betPlace: place,
            currentLap: currentLap,
            betLap: onLap
        }));
    }

    function updateGapOnLapMultiplayer() {
        dispatch(updateGapOnLapMultiplayerAction({
            currentLap: currentLap,
            currentGap: driver.timeToLeader,
            betGap: gap,
            betLap: gapOnLap
        }));
    }


    const setEndOfLap1PlaceBet = () => {
        dispatch(decreaseBalance({amount: selectedChip}));
        dispatch(addBet({
            driverId: driver.driverId,
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
            driverId: driver.driverId,
            type: "placeOnLap",
            place: place,
            onLap: onLap,
            betValue: selectedChip,
            betMultiplayer: placeOnLapMultiplayer,
            state: "set"
        }))
    }

    const setGapOnLapBet = () => {
        dispatch(decreaseBalance({amount: selectedChip}));
        dispatch(addBet({
            driverId: driver.driverId,
            type: "gapToLeader",
            timeToLeader: gap,
            timeToLeaderOnLap: gapOnLap,
            betValue: selectedChip,
            betMultiplayer: gapOnLapMultiplayer,
            state: "set"
        }))
    }

    const setPodiumFinishBet = () => {
        dispatch(decreaseBalance({amount: selectedChip}));
        dispatch(addBet({
            driverId: driver.driverId,
            type: "podiumFinish",
            podiumFinish: true,
            betValue: selectedChip,
            betMultiplayer: podiumFinishMultiplier,
            state: "set"
        }))
    }

    function onEndOfLap1WinCollectClicked(): void {
        dispatch(increaseBalance({amount: endOfLap1PlaceBet!.winValue as number}));
        dispatch(removeBet({
            driverId: driver.driverId,
            type: "endOfLap1Place"
        }))
    }

    function onPlaceOnLapWinCollectClicked(): void {
        dispatch(increaseBalance({amount: placeOnLapBet!.winValue as number}));
        dispatch(removeBet({
            driverId: driver.driverId,
            type: "placeOnLap"
        }))
    }

    function onGapOnLapWinCollectClicked(): void {
        dispatch(increaseBalance({amount: gapOnLapBet!.winValue as number}));
        dispatch(removeBet({
            driverId: driver.driverId,
            type: "gapToLeader"
        }))
    }

    function onPodiumFinishWinCollectClicked(): void {
        dispatch(increaseBalance({amount: podiumFinishBet!.winValue as number}));
        dispatch(removeBet({
            driverId: driver.driverId,
            type: "podiumFinish"
        }))
    }

    function getBetState(bet: Bet | undefined): BetState {
        return bet?.state ? bet.state : lapsEnoughToBet(lapsLeft) ? "default" : "disabled";
    }

    function getMultiplier(bet: Bet | undefined, defaultMultiplayer: number): number {
        if (getBetState(bet) === "won") return bet!.betMultiplayer;
        return bet?.state === "set" ? bet.betMultiplayer : getBetState(bet) === "default" ? defaultMultiplayer : 1;
    }


    return (

        <SetBetsWrapper>
            <DriverName driverName={driver.name} driverId={driver.driverId}/>
            <label>Lap: {currentLap}/{totalLaps}</label>
            <label>Position: {driver.position}</label>
            {driver.timeToLeader > 0 && <label>Gap to leader: {driver.timeToLeader}</label>}
            <BetItemRangeInput
                label="End of lap 1 place:"
                typeLabel="Start"
                minValue={1}
                maxValue={totalDrivers}
                value={endOfLap1PlaceBet?.endOfLap1Place || endOfLap1Place}
                onChange={onendOfLap1PlaceChange}
                onSetBetClicked={setEndOfLap1PlaceBet}
                selectedBetValue={endOfLap1PlaceBet?.state === "set" ? endOfLap1PlaceBet.betValue : selectedChip}
                state={currentLap > 0 && getBetState(endOfLap1PlaceBet) !== "won" ? "disabled" : getBetState(endOfLap1PlaceBet)}
                multiplier={getMultiplier(endOfLap1PlaceBet, endOfLap1Multiplier)}
                winValue={endOfLap1PlaceBet?.winValue || 0}
                onWinCollectClicked={onEndOfLap1WinCollectClicked}
            />

            <BetItemRangeInput
                label="Place:"
                typeLabel="Place"
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
                state={getBetState(placeOnLapBet)}
                multiplier={getMultiplier(placeOnLapBet, placeOnLapMultiplayer)}
                winValue={placeOnLapBet?.winValue || 0}
                onWinCollectClicked={onPlaceOnLapWinCollectClicked}
            />

            <BetItemRangeInput
                label="Gap to leader:"
                typeLabel="Gap"
                minValue={1}
                maxValue={30}
                value={gapOnLapBet?.timeToLeader || gap}
                onChange={setGap}
                label2="OnLap:"
                minValue2={currentLap + 1}
                maxValue2={totalLaps}
                value2={gapOnLapBet?.timeToLeaderOnLap || gapOnLap}
                onChange2={setGapOnLap}
                onSetBetClicked={setGapOnLapBet}
                selectedBetValue={gapOnLapBet?.state === "set" ? gapOnLapBet.betValue : selectedChip}
                state={getBetState(gapOnLapBet)}
                multiplier={getMultiplier(gapOnLapBet, gapOnLapMultiplayer)}
                winValue={gapOnLapBet?.winValue || 0}
                onWinCollectClicked={onGapOnLapWinCollectClicked}
            />

            <BetItemFixedEvent
                label="Podium finish"
                typeLabel="Podium"
                onSetBetClicked={setPodiumFinishBet}
                multiplier={getMultiplier(podiumFinishBet, podiumFinishMultiplier)}
                winValue={podiumFinishBet?.winValue || 0}
                selectedBetValue={podiumFinishBet?.state === "set" ? podiumFinishBet.betValue : selectedChip}
                state={getBetState(podiumFinishBet)}
                onWinCollectClicked={onPodiumFinishWinCollectClicked}/>
            <BettingChips/>
        </SetBetsWrapper>

    );
};

export default DriverBetsList;
