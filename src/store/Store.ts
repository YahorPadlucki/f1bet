import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import driverBetsReducer from './reducers/betsReducer';
import driversReducer from './reducers/driversReducer';
import chipReducer from "./reducers/chipsReducer";
import raceReducer from "./reducers/raceReducer";
import multiplayerReducer from "./reducers/multiplayerReducer";
import balanceReducer from "./reducers/balanceReducer";

const store = configureStore({
    reducer: {
        drivers: driversReducer,
        driverBets: driverBetsReducer,
        chips: chipReducer,
        race: raceReducer,
        multiplayer: multiplayerReducer,
        balance: balanceReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export default store;
