import signinAPI from "./signinAPI";
import React, { useState } from "react";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
export const signin = createAsyncThunk("user/signin", async (payload) => {
  const data = await signinAPI.signIn(payload);
  AsyncStorage.setItem("token", data.data.accessToken);
  AsyncStorage.setItem("refreshToken", data.data.refreshToken);
  AsyncStorage.setItem("user", JSON.stringify(data.data));
  return data.data;
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    user:signin
  },
  reducers: {},
  extraReducers: {
    [signin.fulfilled]: (state, action) => {
      state.user = action.payload;
    },
  },
});

const { reducer } = userSlice;
export default reducer;
