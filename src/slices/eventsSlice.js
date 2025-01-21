import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for fetching events
export const fetchEvents = createAsyncThunk('events/fetchEvents', async () => {
  const response = await axios.get('http://localhost:3000/events');
  return response.data;
});

// Async thunk for deleting an event
export const deleteEventAsync = createAsyncThunk(
    'events/deleteEventAsync',
    async (id, { rejectWithValue }) => {
      try {
        await axios.delete(`http://localhost:3000/events/${id}`);
        return id; 
      } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
      }
    }
  );

  // Async thunk for creating an event
export const createEventAsync = createAsyncThunk(
    'events/createEventAsync',
    async (eventData, { rejectWithValue }) => {
      try {
        const response = await axios.post('http://localhost:3000/events', eventData);
        return response.data; 
      } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
      }
    }
  );

// Async thunk for editing an event
export const editEventAsync = createAsyncThunk(
  'events/editEventAsync',
  async ({ id, eventData }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`http://localhost:3000/events/${id}`, eventData);
      return response.data; // Return the updated event data
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

  
  const eventsSlice = createSlice({
    name: 'events',
    initialState: {
      events: [],
      loading: false,
      error: null,
    },
    reducers: {
      addEvent: (state, action) => {
        state.events.push(action.payload);
      },
      editEvent: (state, action) => {
        const index = state.events.findIndex((event) => event.id === action.payload.id);
        if (index !== -1) {
          state.events[index] = action.payload;
        }
      },
      deleteEvent: (state, action) => {
        state.events = state.events.filter((event) => event.id !== action.payload);
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchEvents.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchEvents.fulfilled, (state, action) => {
          state.loading = false;
          state.events = action.payload;
        })
        .addCase(fetchEvents.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        })
        .addCase(createEventAsync.fulfilled, (state, action) => {
          state.events.push(action.payload);
        })
        .addCase(createEventAsync.rejected, (state, action) => {
          state.error = action.payload;
        })
        .addCase(editEventAsync.fulfilled, (state, action) => {
          const index = state.events.findIndex((event) => event.id === action.payload.id);
          if (index !== -1) {
            state.events[index] = action.payload; // Update the specific event
          }
        })
        .addCase(editEventAsync.rejected, (state, action) => {
          state.error = action.payload;
        })
        .addCase(deleteEventAsync.fulfilled, (state, action) => {
          state.events = state.events.filter((event) => event.id !== action.payload);
        })
        .addCase(deleteEventAsync.rejected, (state, action) => {
          state.error = action.payload;
        });
    },
    
  });
  
  export const { addEvent, editEvent, deleteEvent } = eventsSlice.actions;
  export default eventsSlice.reducer;
  
  
