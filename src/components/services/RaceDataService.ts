import { Driver } from "../../store/reducers/driversReducer";
import {
    calcTimeToLeader,
    parseTime
} from "../bets/betItems/utils";

interface Response {
    MRData: MRData;
}

interface MRData {
    RaceTable: RaceTable;
}

export interface Lap {
    number: number;
    Timings: Driver[];
}


interface RaceTable {
    Races: Race[];
}

interface Race {
    raceName: string;
    Circuit: {
        circuitName: string;
    };
    Laps: Lap[];
    Results?: Result[];
}

interface Result {
    Driver: DriverData;
    grid: number;
}

interface DriverData {
    driverId: string;
    familyName: string;
}


const getRaceData = async () => {
    // const lapsResponse = await fetch('/data/aust.json');
    const lapsResponse = await fetch('https://ergast.com/api/f1/2019/9/laps.json?limit=1420');
    const lapsData = await lapsResponse.json() as Response;
    const laps = lapsData.MRData.RaceTable.Races[0].Laps;

    // const resultsResponse = await fetch('/data/austResults.json');
    const resultsResponse = await fetch('https://ergast.com/api/f1/2019/9/results.json?limit=30');
    const resultsData = await resultsResponse.json() as Response;
    const results = resultsData.MRData.RaceTable.Races[0].Results;


    for (let i = 0; i < laps.length; i++) {
        const lapDetails = laps[i];
        let previousLap;
        if (i !== 0) {
            previousLap = laps[i - 1];
        }
        for (let j = 0; j < lapDetails.Timings.length; j++) {
            laps[i].Timings[j].totalTime = parseTime(lapDetails.Timings[j].time);
            if (previousLap) {
                const prevLap = previousLap.Timings.filter(
                    (lap) => lap.driverId === lapDetails.Timings[j].driverId
                );
                laps[i].Timings[j].totalTime += prevLap[0].totalTime;
            }
            laps[i].Timings[j].timeToLeader = calcTimeToLeader(
                laps[i].Timings[0].totalTime,
                laps[i].Timings[j].totalTime
            );
        }
        if (i === 0 && results) {
            const gridLap: Lap = {number: 0, Timings: []};

            for (let k = 0; k < results.length; k++) {
                const result = results[k];
                gridLap.Timings.push({
                    driverId: result.Driver.driverId,
                    name: result.Driver.familyName,
                    position: result.grid > 0 ? result.grid : results.length, //0 is pitlane start
                    time: '',
                    timeToLeader: -1,
                    totalTime: 0
                })
            }


            laps.unshift(gridLap);


        }
    }
    return laps;
}

export default {getRaceData}