"use client"

import {createSlice} from '@reduxjs/toolkit';
// import {persistReducer} from 'redux-persist';

export const commonSlice = createSlice({
  name: 'commonstoreslice',
  initialState: {
    profileImage: null,
  },
  reducers: {
    setProfileImage: (state, action) => {
      state.profileImage = action.payload ;
    },
  },
});

export const {setProfileImage} =
  commonSlice.actions;

export const commonSliceReducer = commonSlice.reducer;
