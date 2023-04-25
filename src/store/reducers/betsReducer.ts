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
    driverId: string;
    type: BetType
    state: BetState;
    betValue: number;
    betMultiplayer: number;
    podiumFinish?: boolean;
    endOfLap1Place?: number;
    place?: number;
    onLap?: number;
    willPitOnLap?: number;
    timeToLeader?: number;
    timeToLeaderOnLap?: number;
    won?: boolean;
    winValue?: number;
}


interface DriverBetsState {
    [driverId: string]: Bet[];
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
            console.log("updateBet", type)
            if (state[driverId]) {
                const existingBetIndex = state[driverId].findIndex(bet => bet.type === type);
                if (existingBetIndex !== -1) {
                    state[driverId][existingBetIndex] = {...state[driverId][existingBetIndex], ...action.payload};
                }
            }
        },
        removeBet: (state, action: PayloadAction<{ driverId: string, type: BetType }>) => {
            const {driverId, type} = action.payload;
            if (state[driverId]) {
                state[driverId] = state[driverId].filter(bet => bet.type !== type);
            }
        },
        updateBetWinState: (state, action: PayloadAction<{ driverId: string, driverPlace: number, currentLap: number, timeToLeader: number }>) => {
            const {driverId, driverPlace, currentLap, timeToLeader} = action.payload;
            const updatedBets = state[driverId]?.map(bet => {
                if (bet.state === "set") {
                    switch (bet.type) {
                        case "podiumFinish":
                            //check if bet.podiumFinish is true and driver is in podium
                            break;
                        case "endOfLap1Place":
                            if (currentLap !== 1)
                                break;
                            return updateWinState(bet, driverPlace === bet.endOfLap1Place);
                        case "placeOnLap":
                            if (currentLap !== bet.onLap)
                                break;
                            return updateWinState(bet, driverPlace === bet.place);
                        case "gapToLeader":
                            if (currentLap !== bet.timeToLeaderOnLap)
                                break;
                            return updateWinState(bet, Math.abs(bet.timeToLeader! - timeToLeader) <= 1);
                    }
                }
                return bet;
            })
            state[driverId] = updatedBets as Bet[];
        }

    },
});

const updateWinState = (bet: Bet, won: boolean) => {

    const state = won ? "won" : "lost";
    const winValue = won ? bet.betValue * bet.betMultiplayer : 0;
    return {...bet, state, won, winValue}
}


export const {addBet, updateBet, updateBetWinState, removeBet} = driverBetsSlice.actions;

export const selectBetsByDriverId = (driverId: string) => (state: RootState): Bet[] => {
    return state.driverBets[driverId] || [];
};

export const selectBetByType = (driverId: string, type: BetType) => (state: RootState): Bet | undefined => {
    const bets = state.driverBets[driverId] || [];
    return bets.find(bet => bet.type === type);
};

export default driverBetsSlice.reducer;
