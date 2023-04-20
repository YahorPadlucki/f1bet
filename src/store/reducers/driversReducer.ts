import {
    createSelector,
    createSlice,
    PayloadAction
} from '@reduxjs/toolkit';
import { RootState } from '../Store';

export interface Driver {
    id: number;
    name: string;
    place: number;
    lapTime: string;
}

interface DriversState {
    driversById: Record<number, Driver>;
    driversIds: number[];
}

const initialState: DriversState = {
    driversById: {},
    driversIds: [],
};

const driversSlice = createSlice({
    name: 'drivers',
    initialState,
    reducers: {
        addDriver: (state, action: PayloadAction<Driver>) => {
            const {id} = action.payload;
            state.driversById[id] = action.payload;
            state.driversIds.push(id);
        },
        updateDriver: (state, action: PayloadAction<Driver>) => {
            const {id} = action.payload;
            if (state.driversById[id]) {
                state.driversById[id] = {...state.driversById[id], ...action.payload};
            }
        },
        removeDriver: (state, action: PayloadAction<number>) => {
            const index = state.driversIds.indexOf(action.payload);
            if (index !== -1) {
                delete state.driversById[action.payload];
                state.driversIds.splice(index, 1);
            }
        },
    },
});

export const {addDriver, updateDriver, removeDriver} = driversSlice.actions;

export const selectDriverById = (driverId: number) => (state: RootState) =>
    state.drivers.driversById[driverId];

export const totalDriversState = (state: RootState): number =>
    state.drivers.driversIds.length;

export const selectAllDrivers = createSelector(
    (state: RootState) => state.drivers.driversById,
    (state: RootState) => state.drivers.driversIds,
    (driversById, driversIds) => driversIds.map((id) => driversById[id])
);


export default driversSlice.reducer;
