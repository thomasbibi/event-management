import React, { useEffect, useState } from 'react';
import { Box, CircularProgress, Typography, TextField } from '@mui/material';
import EventCard from '../components/EventCard';
import { useSelector, useDispatch } from 'react-redux';
import { fetchEvents } from '../slices/eventsSlice';

const EventList = ({ onView, onRSVP }) => {
  const dispatch = useDispatch();
  const { events, loading, error } = useSelector((state) => state.events);

  const [searchTerm, setSearchTerm] = useState(''); 
  const [filteredEvents, setFilteredEvents] = useState([]);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  useEffect(() => {
    // Filter events based on the search term
    setFilteredEvents(
      events.filter((event) =>
        event.eventName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, events]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
        <Typography color="error">Error: {error}</Typography>
      </Box>
    );
  }

  if (!events.length) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
        <Typography>No events available.</Typography>
      </Box>
    );
  }

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'center', margin:4 }}>
        <TextField
          label="Search Events"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ width: '60%' }}
        />
      </Box>

      <Box
        container
        spacing={2}
        sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}
      >
        {filteredEvents.map((event) => (
          <Box item xs={12} sm={6} md={4} key={event.id}>
            <EventCard event={event} onView={onView} onRSVP={onRSVP} />
          </Box>
        ))}
      </Box>

      {filteredEvents.length === 0 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
          <Typography>No events match your search criteria.</Typography>
        </Box>
      )}
    </>
  );
};

export default EventList;
