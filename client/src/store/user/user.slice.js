import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isAuth: false,
  updateTrigger: false
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.isAuth = true;
    },
    logout: (state) => {
      state.isAuth = false;
      state.user = null;

    },

    updateData: (state) => {
      state.updateTrigger = !state.updateTrigger

    }
  },
});

export const { login, logout, updateData } = userSlice.actions;

export default userSlice.reducer;