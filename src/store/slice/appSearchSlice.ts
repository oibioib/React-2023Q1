import type { PayloadAction } from '@reduxjs/toolkit';

import { createSlice } from '../reduxToolkitRaw';

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
