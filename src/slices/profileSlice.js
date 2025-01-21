import { createSlice } from '@reduxjs/toolkit';

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    name: '',
    email: '',
    bio: '',
    rsvpedEvents: [], 
  },
  reducers: {
    updateProfile: (state, action) => {
      return { ...state, ...action.payload };
    },
    addRSVPEvent: (state, action) => {
      const eventExists = state.rsvpedEvents.find((event) => event.id === action.payload.id);
      if (!eventExists) {
        state.rsvpedEvents.push(action.payload); 
      }
    },
  },
});

export const { updateProfile, addRSVPEvent } = profileSlice.actions;
export default profileSlice.reducer;
