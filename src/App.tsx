import React, { useState } from 'react';
import './App.css';
import Standings from "./components/standings/Standings";
import { driverDataArray } from "./components/services/TempData";
import RaceInfo from "./components/RaceInfo";
import ControlPanel from "./components/ControlPanel";
import Modal from "./components/Modal";
import { DriverData } from "./components/standings/DriverData";
import SetBets from "./components/bets/SetBets";

function App() {
    const [driversData, setDriversData] = useState(driverDataArray);
    const [isSetBetOpened, setIsSetBetOpened] = useState(true);

    function handleStart() {
        console.log("Race started!");
    }

    function handlePause() {
        console.log("Race paused!");
    }

    function handleReset() {
        console.log("Race reset!");
    }

    function onDriverClicked(driverData:DriverData){
        setIsSetBetOpened(true);
    }

    return (
        <>
            <RaceInfo title="2022 Australian Grand Prix" currentLap={5} totalLaps={58}/>
            <Modal isOpened={isSetBetOpened} close={() => setIsSetBetOpened(false)}>
                <SetBets/>
            </Modal>
            <Standings driversData={driversData} onDriverClicked={onDriverClicked}/>
            <ControlPanel onStart={handleStart} onPause={handlePause} onReset={handleReset}/>
        </>
    );
}

export default App;
