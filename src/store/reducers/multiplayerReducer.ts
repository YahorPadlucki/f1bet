import {
    createSlice,
    PayloadAction
} from "@reduxjs/toolkit";
import { RootState } from "../store";

interface MultiplayerState {
    podiumFinishedMultiplayer: number;
    placeOnLapMultiplayer: number;
    gapOnLapMultiplayer: number;
    endOfLap1Multiplayer: number;
}

const initialState: MultiplayerState = {
    podiumFinishedMultiplayer: 1,
    placeOnLapMultiplayer: 1,
    gapOnLapMultiplayer: 1,
    endOfLap1Multiplayer: 1,
};

export const multiplayerSlice = createSlice({
    name: "multiplayer",
    initialState,
    reducers: {
        updateEndOfLap1MultiplayerAction: (
            state,
            action: PayloadAction<{ currentPlace: number; betPlace: number }>
        ) => {
            const currentPlace = action.payload.currentPlace;
            const betPlace = action.payload.betPlace;
            const placeDifference = currentPlace - betPlace;

            state.endOfLap1Multiplayer = Math.max(
                1,
                Math.min(Math.abs(placeDifference), 10)
            );
        },

        updatePlaceOnLapMultiplayerAction: (
            state,
            action: PayloadAction<{
                currentPlace: number;
                betPlace: number;
                currentLap: number;
                betLap: number;
            }>
        ) => {
            const currentPlace = action.payload.currentPlace;
            const betPlace = action.payload.betPlace;

            const currentLap = action.payload.currentLap;
            const betLap = action.payload.betLap;

            const placeDifference = currentPlace - betPlace;
            const lapDifference = betLap - currentLap;

            state.placeOnLapMultiplayer = diffMultiplayer(
                placeDifference,
                lapDifference
            );
        },

        updateGapOnLapMultiplayerAction: (
            state,
            action: PayloadAction<{
                currentGap: number;
                currentLap: number;
                betGap: number;
                betLap: number;
            }>
        ) => {
            const currentGap = Math.floor(action.payload.currentGap);
            const betGap = action.payload.betGap;

            const currentLap = action.payload.currentLap;
            const betLap = action.payload.betLap;

            const gapDifference = currentGap - betGap;
            console.log("betGap", betGap);
            const lapDifference = betLap - currentLap;

            state.gapOnLapMultiplayer = diffMultiplayer(gapDifference, lapDifference);
        },

        updatePodiumFinishedMultiplayerAction: (
            state,
            action: PayloadAction<{
                currentLap: number;
                totalLaps: number;
                driverPosition: number;
            }>
        ) => {
            const currentLap = action.payload.currentLap;
            const totalLaps = action.payload.totalLaps;
            const driverPosition = action.payload.driverPosition;
            const lapsLeft = totalLaps - currentLap;
            const podiumDiff = Math.max(driverPosition - 3, 0);

            state.podiumFinishedMultiplayer = Math.round(
                lapsLeft / 10 + Math.max(0, Math.min(podiumDiff, 16))
            );
        },
    },
});

function diffMultiplayer(diff1: number, lapsDiff: number): number {
    const placeMultiplier = Math.max(0, Math.min(Math.abs(diff1) - 1, 10));
    const lapMultiplier = Math.max(0, Math.min(Math.abs(lapsDiff) - 3, 10));

    return Math.max(1, placeMultiplier + lapMultiplier);
}

export const {
    updatePodiumFinishedMultiplayerAction,
    updateEndOfLap1MultiplayerAction,
    updatePlaceOnLapMultiplayerAction,
    updateGapOnLapMultiplayerAction,
} = multiplayerSlice.actions;
export const podiumFinishedMultiplayerState = (state: RootState): number =>
    state.multiplayer.podiumFinishedMultiplayer;
export const placeOnLapMultiplayerState = (state: RootState): number =>
    state.multiplayer.placeOnLapMultiplayer;
export const endOfLap1MultiplayerState = (state: RootState): number =>
    state.multiplayer.endOfLap1Multiplayer;
export const gapOnLapMultiplayerState = (state: RootState): number =>
    state.multiplayer.gapOnLapMultiplayer;

export default multiplayerSlice.reducer;
