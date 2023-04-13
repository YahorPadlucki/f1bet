import {
    createSlice,
    PayloadAction
} from '@reduxjs/toolkit';
import { RootState } from '../Store';

interface MultiplayerState {
    podiumFinishedMultiplayer: number;
    placeOnLapMultiplayer: number;
    endOfLap1Multiplayer: number;
}

const initialState: MultiplayerState = {
    podiumFinishedMultiplayer: 10,
    placeOnLapMultiplayer: 10,
    endOfLap1Multiplayer: 10,
};

export const multiplayerSlice = createSlice({
    name: 'multiplayer',
    initialState,
    reducers: {
        updateValueAction: (state, action: PayloadAction<{ currentLap: number; totalLaps: number; driverPosition: number }>) => {
            const currentLap = action.payload.currentLap;
            const totalLaps = action.payload.totalLaps;
            const driverPosition = action.payload.driverPosition;
            const lapsLeft = totalLaps - currentLap;

            state.podiumFinishedMultiplayer = Math.floor((10 / (totalLaps - 5)) * lapsLeft);


            // Calculate placeOnLapMultiplayer
            const lapsPerSection = Math.ceil(totalLaps / 3);
            const section = Math.ceil((totalLaps - lapsLeft) / lapsPerSection);
            const positionInSection = driverPosition % lapsPerSection || lapsPerSection;
            state.placeOnLapMultiplayer = 100 - ((section - 1) * 25) - ((positionInSection - 1) * 5);

            // Calculate endOfLap1Multiplayer
            if (currentLap === 1) {
                state.endOfLap1Multiplayer = 100;
            } else {
                state.endOfLap1Multiplayer = 0;
            }
        },
        updateEndOfLap1MultiplayerAction: (state, action: PayloadAction<{ currentPlace: number, betPlace: number }>) => {
            const currentPlace = action.payload.currentPlace;
            const betPlace = action.payload.betPlace;
            const placeDifference = currentPlace - betPlace;

            state.endOfLap1Multiplayer = Math.max(1, Math.min(Math.abs(placeDifference), 10));
        }
    },
});

export const {updateValueAction,updateEndOfLap1MultiplayerAction} = multiplayerSlice.actions;
export const podiumFinishedMultiplayerStore = (state: RootState): number => state.multiplayer.podiumFinishedMultiplayer;
export const placeOnLapMultiplayerStore = (state: RootState): number => state.multiplayer.placeOnLapMultiplayer;
export const endOfLap1MultiplayerStore = (state: RootState): number => state.multiplayer.endOfLap1Multiplayer;

export default multiplayerSlice.reducer;
