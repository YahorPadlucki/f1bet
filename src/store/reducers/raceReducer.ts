import {
    createSlice,
    PayloadAction
} from '@reduxjs/toolkit';
import {
    AppDispatch,
    RootState
} from "../Store";
import raceDataService, { Lap } from "../../components/services/RaceDataService";

interface RaceState {
    currentLap: number;
    totalLaps: number;
    raceName: string;
    Laps: Lap[];
}
const initialState: RaceState = {
    currentLap: 0,
    totalLaps: 52,
    raceName: "",
    Laps: []
};


export const raceSlice = createSlice({
    name: 'race',
    initialState,
    reducers: {
        setCurrentLap: (state, action: PayloadAction<{ currentLap: number }>) => {
            state.currentLap = action.payload.currentLap;
        },
        parseInitialRaceData: (state, action: PayloadAction<Lap[]>) => {
            state.currentLap=0;
            state.totalLaps=action.payload.length-1;//0 lap is for starting grid
            state.Laps = action.payload;
        }
    },
});

export const initializeRaceData = () => {
    return async (dispatch: AppDispatch) => {
        const laps = await raceDataService.getRaceData()
        dispatch(parseInitialRaceData(laps))
    }
}

export const {setCurrentLap,parseInitialRaceData} = raceSlice.actions;
export const currentLapState = (state: RootState): number => state.race.currentLap;
export const totalLapsState = (state: RootState): number => state.race.totalLaps;
export const currentLapDataState = (state: RootState): Lap => state.race.Laps[state.race.currentLap];
export const lapsLeftState = (state: RootState): number => state.race.totalLaps - state.race.currentLap;
export const lapsDataState = (state: RootState): Lap[] => state.race.Laps;

export default raceSlice.reducer;