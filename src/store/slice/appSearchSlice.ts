import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  value: '',
};

export const appSearchSlice = createSlice({
  name: 'appSearch',
  initialState,
  reducers: {
    setAppSearchValue: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export default appSearchSlice.reducer;
