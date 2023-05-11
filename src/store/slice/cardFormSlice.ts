import { Card } from '@components/types';
import type { PayloadAction } from '@reduxjs/toolkit';

import { createSlice } from '../reduxToolkitRaw';

const initialState: { cards: Card[] } = {
  cards: [],
};

export const cardFormSlice = createSlice({
  name: 'cardForm',
  initialState,
  reducers: {
    addFormCard: (state, { payload }: PayloadAction<Card>) => {
      state.cards = [...state.cards, payload];
    },
  },
});

export default cardFormSlice.reducer;
