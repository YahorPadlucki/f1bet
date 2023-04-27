import {
    createSlice,
    PayloadAction
} from "@reduxjs/toolkit";
import {
    AppDispatch,
    RootState
} from "../store";
import raceDataService, {
    Lap,
} from "../../components/services/raceDataService";

interface RaceState {
    currentLap: number;
    totalLaps: number;
    raceName: string;
    laps: Lap[];
}

const initialState: RaceState = {
    currentLap: 0,
    totalLaps: 52,
    raceName: "",
    laps: [],
};

export const raceSlice = createSlice({
    name: "race",
    initialState,
    reducers: {
        setCurrentLap: (state, action: PayloadAction<{ currentLap: number }>) => {
            state.currentLap = action.payload.currentLap;
        },
        parseInitialRaceData: (state, action: PayloadAction<Lap[]>) => {
            state.currentLap = 0;
            state.totalLaps = action.payload.length - 1; //0 lap is for starting grid
            state.laps = action.payload;
        },
    },
});

export const initializeRaceData = () => {
    return async (dispatch: AppDispatch) => {
        const laps = await raceDataService.getRaceData();
        dispatch(parseInitialRaceData(laps));
    };
};

export const {setCurrentLap, parseInitialRaceData} = raceSlice.actions;
export const currentLapState = (state: RootState): number =>
    state.race.currentLap;
export const totalLapsState = (state: RootState): number =>
    state.race.totalLaps;
export const currentLapDataState = (state: RootState): Lap =>
    state.race.laps[state.race.currentLap];
export const lapsLeftState = (state: RootState): number =>
    state.race.totalLaps - state.race.currentLap;
export const lapsDataState = (state: RootState): Lap[] => state.race.laps;

export default raceSlice.reducer;
