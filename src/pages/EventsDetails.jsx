import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { useLocation } from 'react-router'; 
import { Box } from '@mui/material';

const EventsDetails = () => {
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

  return (
    <>
      <Paper sx={{textAlign:'center', fontSize:'2rem', padding:"2em", backgroundColor:'#eee',width:'80%', margin:'3% auto'}}>
      {error ? (
        <p>{error}</p>
      ) : (
        <>
          <h2>{data?.eventName || 'Event Name Not Available'}</h2>
          <h6>{data?.date}</h6>
          <Box>
            <p>{data?.description}</p>
          </Box>
          {data?.img && data.img.length > 0 ? (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center'}}>
                {data.img.map((image, index) => (
                  <img
                    key={index}
                    src={`http://localhost:3000/${image}`}
                    alt={`Event ${index + 1}`}
                    style={{ width: '350px', height: 'auto', borderRadius: '8px' }}
                  />
                ))}
              </Box>
            ) : (
              <p>No images available for this event.</p>
            )}
        </>
      )}
    </Paper>
    </>
  
  );
};

export default EventsDetails;
