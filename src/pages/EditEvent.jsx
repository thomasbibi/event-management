import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router';
import { Box } from '@mui/material';
import EventForm from '../components/EventForm';

const EditEvent = () => {
  const location = useLocation();
  const uid = location?.pathname.split('/').pop() || 0;
  const [data, setData] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/events/${uid}`);
        setData(res?.data);
      } catch (err) {
        console.error('Error fetching event details:', err);
        setError('Failed to fetch event details');
      }
    };

    fetchData();
  }, [uid]);

  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate('/events'); // Redirect after successful edit
  };

  return (
    <>
      <Box sx={{ textAlign: 'center', margin: "50px", padding: "50px" }}>
        <h2>Edit Your Event</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </Box>
      <EventForm mode="edit" id={uid} initialData={data} onSuccess={handleSuccess} />
    </>
  );
};

export default EditEvent;
