import {
    createSelector,
    createSlice,
    PayloadAction
} from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface Driver {
    driverId: string;
    name: string;
    position: number;
    time: string;
    timeToLeader: number;
    totalTime: number;
    y?: number;
}

interface DriversState {
    driversById: Record<string, Driver>;
    driversIds: string[];
}

const initialState: DriversState = {
    driversById: {},
    driversIds: [],
};

const driversSlice = createSlice({
    name: "drivers",
    initialState,
    reducers: {
        addDriver: (state, action: PayloadAction<Driver>) => {
            const {driverId} = action.payload;
            state.driversById[driverId] = action.payload;
            state.driversIds.push(driverId);
        },
        updateDriver: (state, action: PayloadAction<Driver>) => {
            const {driverId} = action.payload;
            if (state.driversById[driverId]) {
                state.driversById[driverId] = {
                    ...state.driversById[driverId],
                    ...action.payload,
                };
            }
        },
    },
});

export const {addDriver, updateDriver} = driversSlice.actions;

export const selectDriverById = (driverId: string) => (state: RootState) =>
    state.drivers.driversById[driverId];

export const totalDriversState = (state: RootState): number =>
    state.drivers.driversIds.length;

export const selectAllDrivers = createSelector(
    (state: RootState) => state.drivers.driversById,
    (state: RootState) => state.drivers.driversIds,
    (driversById, driversIds) => driversIds.map((id) => driversById[id])
);

export default driversSlice.reducer;
