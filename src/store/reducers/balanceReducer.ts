import {
    createSlice,
    PayloadAction
} from '@reduxjs/toolkit';
import { RootState } from "../Store";

interface BalanceState {
    balance: number;
}

const initialState: BalanceState = {
    balance: 500
};

export const balanceSlice = createSlice({
    name: 'balance',
    initialState,
    reducers: {
        increaseBalance: (state, action: PayloadAction<{ amount: number }>) => {
            state.balance += action.payload.amount;
        },
        decreaseBalance: (state, action: PayloadAction<{ amount: number }>) => {
            state.balance -= action.payload.amount;
        },
    },
});

export const {increaseBalance, decreaseBalance} = balanceSlice.actions;
export const currentBalanceState = (state: RootState): number => state.balance.balance;

export default balanceSlice.reducer;