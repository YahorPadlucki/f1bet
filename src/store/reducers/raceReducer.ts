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
    currentLap: 0,
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
export const currentLapStore = (state: RootState): number => state.race.currentLap;
export const totalLapsStore = (state: RootState): number => state.race.totalLaps;
export const lapsLeftStore = (state: RootState): number => state.race.totalLaps - state.race.currentLap;

export default raceSlice.reducer;