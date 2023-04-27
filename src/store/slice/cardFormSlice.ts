import { Card } from '@components/types';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

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
