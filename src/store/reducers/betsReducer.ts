import {
    createSlice,
    PayloadAction
} from '@reduxjs/toolkit';
import { RootState } from '../Store';
import {
    BetState,
    BetType
} from "../../types/BetTypes";

export interface Bet {
    driverId: number;
    type: BetType
    state: BetState;
    betValue: number;
    podiumFinish?: boolean;
    endOfLap1Place?: number;
    place?: number;
    onLap?: number;
    willPitOnLap?: number;
    gapToLeaderValue?: number;
    gapToLeaderOnLap?: number;
}

interface DriverBetsState {
    [driverId: number]: Bet[];
}

const initialState: DriverBetsState = {};

const driverBetsSlice = createSlice({
    name: 'driverBets',
    initialState,
    reducers: {
        addBet: (state, action: PayloadAction<Bet>) => {
            const {driverId, type} = action.payload;
            const newBet = {...action.payload, won: false};
            if (!state[driverId]) {
                state[driverId] = [];
            }
            const existingBetIndex = state[driverId].findIndex(bet => bet.type === type);
            if (existingBetIndex === -1) {
                state[driverId].push(newBet);
            } else {
                state[driverId][existingBetIndex] = newBet;
            }
        },
        updateBet: (state, action: PayloadAction<Bet>) => {
            const {driverId, type} = action.payload;
            if (state[driverId]) {
                const existingBetIndex = state[driverId].findIndex(bet => bet.type === type);
                if (existingBetIndex !== -1) {
                    state[driverId][existingBetIndex] = {...state[driverId][existingBetIndex], ...action.payload};
                }
            }
        },
        removeBet: (state, action: PayloadAction<{ driverId: number, type: BetType }>) => {
            const {driverId, type} = action.payload;
            if (state[driverId]) {
                state[driverId] = state[driverId].filter(bet => bet.type !== type);
            }
        },
    },
});

export const {addBet, updateBet, removeBet} = driverBetsSlice.actions;

export const selectBetsByDriverId = (driverId: number) => (state: RootState): Bet[] => {
    return state.driverBets[driverId] || [];
};

export const selectBetByType = (driverId: number, type: BetType) => (state: RootState): Bet | undefined => {
    const bets = state.driverBets[driverId] || [];
    return bets.find(bet => bet.type === type);
};

export default driverBetsSlice.reducer;
