import React, {
    ChangeEvent,
    useEffect,
    useState
} from 'react';
import './App.css';
import Standings from "./components/standings/Standings";
import RaceInfo from "./components/RaceInfo";
import ControlPanel from "./components/ControlPanel";
import Modal from "./components/Modal";
import DriverBetsList from "./components/bets/DriverBetsList";

import {
    addDriver,
    Driver,
    selectAllDrivers,
    selectDriverById
} from './store/reducers/driversReducer';
import { useSelector } from "react-redux";
import store, { useAppDispatch } from "./store/Store";
import { driverDataArray } from "./components/services/TempData";
import {
    currentLapState,
    setCurrentLap,
    totalLapsState
} from "./store/reducers/raceReducer";
import {
    Bet,
    removeBet,
    selectBetsByDriverId,
    updateBetWinState
} from "./store/reducers/betsReducer";
import BalanceBar from "./components/balance/BalanceBar";
import { currentBalanceState } from "./store/reducers/balanceReducer";
import styled from "styled-components";

const AppWrapper = styled.div`
 height: calc(100vh - 70px);
 overflowY: auto;
`;

function App() {
    const dispatch = useAppDispatch();

    const currentLap = useSelector(currentLapState);
    const totalLaps = useSelector(totalLapsState);
    const balance = useSelector(currentBalanceState);

    const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
    const [isSetBetOpened, setIsSetBetOpened] = useState(false);
    const drivers = useSelector(selectAllDrivers);


    useEffect(() => {
        drivers.forEach((driver) => {
            dispatch(updateBetWinState({driverId: driver.id, driverPlace: driver.place, currentLap: currentLap}));
            selectBetsByDriverId(driver.id)(store.getState()).forEach((bet) => {
                if (bet.state === 'lost') {
                    dispatch(removeBet({
                        driverId: driver.id,
                        type: bet.type
                    }))
                }
            });
        })
    }, [currentLap]);

    useEffect(() => {
        console.log("App useEffect");
        const drivers = driverDataArray.map((driverData) => {
            return {
                id: driverData.id,
                name: driverData.name,
                place: driverData.place,
                lapTime: driverData.lapTime,
            };
        });

        drivers.forEach((driver) => {
            const existingDriver = selectDriverById(driver.id)(store.getState());

            if (!existingDriver) {
                dispatch(addDriver(driver));
            }
        });

    }, []);

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
        <>
            <div style={{}}>
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
                        style={{width: '100%'}}
                        min={1}
                        max={totalLaps}
                        value={currentLap}
                        onChange={handleCurrentLapChanged}
                    />
                </>

            </div>

            <BalanceBar balance={balance}/>
        </>

    );
}

export default App;
