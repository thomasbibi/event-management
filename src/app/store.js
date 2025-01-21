import { configureStore } from '@reduxjs/toolkit';
import eventsReducer from '../slices/eventsSlice';
import authReducer from '../slices/authSlice';
import profileReducer from '../slices/profileSlice'


const store = configureStore({
  reducer: {
    events: eventsReducer,
    auth: authReducer,
    profile: profileReducer,
  }
})

export default store;
