import React, {
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
    currentLapStore,
    totalLapsStore
} from "./store/reducers/raceReducer";

function App() {
    const dispatch = useAppDispatch();

    const currentLap = useSelector(currentLapStore);
    const totalLaps = useSelector(totalLapsStore);

    const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
    const [isSetBetOpened, setIsSetBetOpened] = useState(false);
    const drivers = useSelector(selectAllDrivers);

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
            <RaceInfo title="2022 Australian Grand Prix" currentLap={currentLap} totalLaps={totalLaps}/>
            <Modal isOpened={isSetBetOpened} close={() => setIsSetBetOpened(false)}>
                <DriverBetsList driver={selectedDriver!}/>
            </Modal>
            <Standings drivers={drivers} onDriverClicked={onDriverClicked}/>
            <ControlPanel onStart={handleStart} onPause={handlePause} onReset={handleReset}/>
        </>

    );
}

export default App;
