import {
    createSlice,
    PayloadAction
} from "@reduxjs/toolkit";
import { RootState } from "../store";

interface ChipState {
    selectedChipValue: number;
    chips: number[];
}

const initialState: ChipState = {
    selectedChipValue: 5,
    chips: [1, 2, 3, 5, 10, 50],
};

export const chipsSlice = createSlice({
    name: "chips",
    initialState,
    reducers: {
        setChip: (state, action: PayloadAction<{ chipValue: number }>) => {
            state.selectedChipValue = action.payload.chipValue;
        },
    },
});

export const {setChip} = chipsSlice.actions;
export const selectedChipValue = (state: RootState): number =>
    state.chips.selectedChipValue;
export const getAllChips = (state: RootState): number[] => state.chips.chips;

export default chipsSlice.reducer;
