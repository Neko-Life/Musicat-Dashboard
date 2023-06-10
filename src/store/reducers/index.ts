import { combineReducers } from '@reduxjs/toolkit';
import { mainSlice } from './main';

export const reducer = combineReducers({
  [mainSlice.name]: mainSlice.reducer,
});

export const actions = {
  [mainSlice.name]: mainSlice.actions,
};
