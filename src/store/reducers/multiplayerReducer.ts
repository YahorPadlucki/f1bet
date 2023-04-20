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
    podiumFinishedMultiplayer: 1,
    placeOnLapMultiplayer: 1,
    endOfLap1Multiplayer: 1,
};

export const multiplayerSlice = createSlice({
    name: 'multiplayer',
    initialState,
    reducers: {
        updateEndOfLap1MultiplayerAction: (state, action: PayloadAction<{ currentPlace: number, betPlace: number }>) => {
            const currentPlace = action.payload.currentPlace;
            const betPlace = action.payload.betPlace;
            const placeDifference = currentPlace - betPlace;

            state.endOfLap1Multiplayer = Math.max(1, Math.min(Math.abs(placeDifference), 10));
        },

        updatePlaceOnLapMultiplayerAction: (state, action: PayloadAction<{ currentPlace: number, betPlace: number, currentLap: number, betLap: number }>) => {
            const currentPlace = action.payload.currentPlace;
            const betPlace = action.payload.betPlace;
            const placeDifference = currentPlace - betPlace;

            const currentLap = action.payload.currentLap;
            const betLap = action.payload.betLap;
            const lapDifference = betLap - currentLap;

            const placeMultiplier = Math.max(0, Math.min(Math.abs(placeDifference) - 1, 10));
            const lapMultiplier = Math.max(0, Math.min(Math.abs(lapDifference) - 3, 10));

            state.placeOnLapMultiplayer = Math.max(1, placeMultiplier + lapMultiplier);
        },
        updatePodiumFinishedMultiplayerAction: (state, action: PayloadAction<{ currentLap: number; totalLaps: number; driverPosition: number }>) => {
            const currentLap = action.payload.currentLap;
            const totalLaps = action.payload.totalLaps;
            const driverPosition = action.payload.driverPosition;
            const lapsLeft = totalLaps - currentLap;
            const podiumDiff = Math.max(driverPosition - 3, 0);

            state.podiumFinishedMultiplayer = Math.round(lapsLeft / 10 + Math.max(0, Math.min(podiumDiff, 16)));

        }
    },
});

export const {
    updatePodiumFinishedMultiplayerAction,
    updateEndOfLap1MultiplayerAction,
    updatePlaceOnLapMultiplayerAction
} = multiplayerSlice.actions;
export const podiumFinishedMultiplayerState = (state: RootState): number => state.multiplayer.podiumFinishedMultiplayer;
export const placeOnLapMultiplayerState = (state: RootState): number => state.multiplayer.placeOnLapMultiplayer;
export const endOfLap1MultiplayerState = (state: RootState): number => state.multiplayer.endOfLap1Multiplayer;

export default multiplayerSlice.reducer;
