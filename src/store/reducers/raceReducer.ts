import {
    createSlice,
    PayloadAction
} from '@reduxjs/toolkit';
import { RootState } from "../Store";

interface RaceState {
    currentLap: number;
    totalLaps: number;
}

const initialState: RaceState = {
    currentLap: 1,
    totalLaps: 52
};

export const raceSlice = createSlice({
    name: 'race',
    initialState,
    reducers: {
        setCurrentLap: (state, action: PayloadAction<{ currentLap: number }>) => {
            state.currentLap = action.payload.currentLap;
        },
    },
});

export const {setCurrentLap} = raceSlice.actions;
export const currentLapState = (state: RootState): number => state.race.currentLap;
export const totalLapsState = (state: RootState): number => state.race.totalLaps;
export const lapsLeftState = (state: RootState): number => state.race.totalLaps - state.race.currentLap;

export default raceSlice.reducer;