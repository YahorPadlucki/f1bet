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
import { useSelector } from "react-redux";
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

const AppWrapper = styled.div`
height: 100vh;
overflow: hidden;
`;

function App() {
    const dispatch = useAppDispatch();

    const currentLap = useSelector(currentLapState);
    const totalLaps = useSelector(totalLapsState);
    const balance = useSelector(currentBalanceState);
    const currentLapData = useSelector(currentLapDataState);
    const allLapsData = useSelector(lapsDataState);

    const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
    const [isSetBetOpened, setIsSetBetOpened] = useState(false);
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
            dispatch(updateDriver(driver));
        });
    }, [currentLap]);

    useEffect(() => {
        drivers.forEach((driver) => {
            dispatch(updateBetWinState({
                driverId: driver.driverId,
                driverPlace: +driver.position,
                timeToLeader: +driver.timeToLeader,
                currentLap: currentLap
            }));
            selectBetsByDriverId(driver.driverId)(store.getState()).forEach((bet) => {
                if (bet.state === 'lost') {
                    dispatch(removeBet({
                        driverId: driver.driverId,
                        type: bet.type
                    }))
                }
            });
        })

    }, [drivers]);


    const handleCurrentLapChanged = (event: ChangeEvent<HTMLInputElement>) => {
        dispatch(setCurrentLap({currentLap: Number(event.target.value)}));
    };

    function handleStart() {
        console.log("Race started!");
    }

    function handlePause() {
        console.log("Race paused!");
    }

    function handleReset() {
        console.log("Race reset!");
    }

    function onDriverClicked(driverData: Driver) {
        console.log("onDriverClicked " + driverData.name)
        setSelectedDriver(driverData);
        setIsSetBetOpened(true);
    }

    return (
        <AppWrapper>

            <RaceInfo title="2022 Australian Grand Prix" currentLap={currentLap} totalLaps={totalLaps}/>
            <Modal isOpened={isSetBetOpened} close={() => setIsSetBetOpened(false)}>
                <DriverBetsList driver={selectedDriver!}/>
            </Modal>
            <Standings drivers={drivers} onDriverClicked={onDriverClicked}/>
            {/*<ControlPanel onStart={handleStart} onPause={handlePause} onReset={handleReset}/>*/}
            <>
                <input
                    type="range"
                    id="Current lap"
                    style={{
                        width: '100%',
                        height: '3%'
                    }}
                    min={0}
                    max={totalLaps}
                    value={currentLap}
                    onChange={handleCurrentLapChanged}
                />
            </>
            <BalanceBar balance={balance}/>
        </AppWrapper>


    );
}

export default App;
