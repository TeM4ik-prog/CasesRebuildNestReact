import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  updateTrigger: false
};

export const userSlice = createSlice({
  name: 'loot',
  initialState,
  reducers: {

    updateInventory: (state) => {
      state.updateTrigger = !state.updateTrigger

    }
  },
});

export const { updateInventory } = userSlice.actions;

export default userSlice.reducer;