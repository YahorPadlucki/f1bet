import {
    Action,
    configureStore
} from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { ThunkAction } from 'redux-thunk';

import driverBetsReducer from './reducers/betsReducer';
import driversReducer from './reducers/driversReducer';
import chipReducer from "./reducers/chipsReducer";

const store = configureStore({
    reducer: {
        drivers: driversReducer,
        driverBets: driverBetsReducer,
        chips: chipReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export default store;