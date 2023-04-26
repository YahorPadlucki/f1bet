import React, {
    ChangeEvent,
    useEffect,
    useState
} from 'react';
import './App.css';
import Standings from "./components/standings/Standings";
import RaceInfo from "./components/RaceInfo";
import Modal from "./components/Modal";
import DriverBetsList from "./components/bets/DriverBetsList";

import {
    addDriver,
    Driver,
    selectAllDrivers,
    selectDriverById,
    updateDriver
} from './store/reducers/driversReducer';
import {
    useSelector
} from "react-redux";
import store, { useAppDispatch } from "./store/Store";
import {
    currentLapDataState,
    currentLapState,
    initializeRaceData,
    lapsDataState,
    setCurrentLap,
    totalLapsState
} from "./store/reducers/raceReducer";
import {
    removeBet,
    selectBetsByDriverId,
    updateBetWinState
} from "./store/reducers/betsReducer";
import BalanceBar from "./components/balance/BalanceBar";
import { currentBalanceState } from "./store/reducers/balanceReducer";
import styled from "styled-components";
import RaceLights from "./components/RaceLights";
import PlayPauseButton from "./components/PlayPauseButton";
import ReactConfetti from "react-confetti";

const AppWrapper = styled.div`
height: 100vh;
overflow: hidden;
position: relative;

`;

const PLAY_SPEED_MS = 2000;


function App() {
    const dispatch = useAppDispatch();

    const currentLap = useSelector(currentLapState);
    const totalLaps = useSelector(totalLapsState);
    const balance = useSelector(currentBalanceState);
    const currentLapData = useSelector(currentLapDataState);
    const allLapsData = useSelector(lapsDataState);

    const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
    const [isSetBetOpened, setIsSetBetOpened] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [raceStarted, setRaceStarted] = useState(false);
    const [confetti, setConfetti] = useState(0);
    const drivers = useSelector(selectAllDrivers) || [];

    useEffect(() => {
        console.log("initial fetch");
        dispatch(initializeRaceData())
    }, []);

    useEffect(() => {
        currentLapData?.Timings.map((driver) => {
            const existingDriver = selectDriverById(driver.driverId)(store.getState());

            if (!existingDriver) {
                dispatch(addDriver(driver));
            }
        });
    }, [allLapsData]);

    useEffect(() => {
        currentLapData?.Timings.forEach((driver) => {
            console.log("updateDriver changed");

            dispatch(updateDriver(driver));
        });

        if (currentLap === totalLaps) {
            setIsPlaying(false);
            setConfetti(200);
            setTimeout(() => {
                setConfetti(0);
            }, 2000)
        }
    }, [currentLap]);

    useEffect(() => {
        drivers.forEach((driver) => {
            dispatch(updateBetWinState({
                driverId: driver.driverId,
                driverPlace: +driver.position,
                timeToLeader: +driver.timeToLeader,
                currentLap: currentLap,
                totalLaps: totalLaps
            }));
            selectBetsByDriverId(driver.driverId)(store.getState()).forEach((bet) => {
                if (bet.state === 'lost') {
                    dispatch(removeBet({
                        driverId: driver.driverId,
                        type: bet.type
                    }))
                }
            });

            if (selectedDriver?.driverId === driver.driverId) {
                setSelectedDriver(driver);
            }
        })


    }, [drivers]);

    useEffect(() => {
        if (!isPlaying || !raceStarted) return
        const interval = setInterval(() => {
            dispatch(setCurrentLap({currentLap: currentLap + 1}));
        }, PLAY_SPEED_MS);
        return () => clearInterval(interval);
    }, [isPlaying, raceStarted, currentLap]);


    const handleCurrentLapChanged = (event: ChangeEvent<HTMLInputElement>) => {
        dispatch(setCurrentLap({currentLap: Number(event.target.value)}));
    };

    function onPlayButtonClicked(isPlaying: boolean) {
        setIsPlaying(isPlaying);
    }

    function OnLightsOut() {
        setInterval(() => setRaceStarted(true), 1000);
        setConfetti(200);
        setInterval(() => setConfetti(0), 2000);
    }


    function onDriverClicked(driverData: Driver) {
        console.log("onDriverClicked " + driverData.name)
        setSelectedDriver(driverData);
        setIsSetBetOpened(true);
    }

    return (
        <AppWrapper>
            <PlayPauseButton onClick={onPlayButtonClicked}/>
            <RaceInfo title="Austrian Grand Prix" currentLap={currentLap} totalLaps={totalLaps}/>
            <Modal isOpened={isSetBetOpened} close={() => setIsSetBetOpened(false)}>
                <DriverBetsList driver={selectedDriver!}/>
            </Modal>
            <Standings drivers={drivers} onDriverClicked={onDriverClicked}/>
            {/*<ControlPanel onStart={handleStart} onPause={handlePause} onReset={handleReset}/>*/}
            <>
                <input
                    type="range"
                    id="Current lap"
                    className={'slider'}
                    min={0}
                    max={totalLaps}
                    value={currentLap}
                    onChange={handleCurrentLapChanged}
                />
            </>
            <BalanceBar balance={balance}/>
            {!raceStarted && isPlaying && <RaceLights onLightsOut={OnLightsOut}/>}
            <ReactConfetti numberOfPieces={confetti}/>
        </AppWrapper>


    );
}

export default App;
