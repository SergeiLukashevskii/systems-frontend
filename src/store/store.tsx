import { configureStore } from '@reduxjs/toolkit'
import mainReducer from './mainReducer'
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const store = configureStore({
    reducer: mainReducer
});

export type RootState = ReturnType<typeof store.getState>;
export type AddDispatch = typeof store.dispatch;

export const useTypeDispatch = () => useDispatch<AddDispatch>();
export const useTypeSelector: TypedUseSelectorHook<RootState> = useSelector;

