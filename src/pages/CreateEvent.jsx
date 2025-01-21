import React from 'react'
import EventForm from '../components/EventForm';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router';


const CreateEvent = () => {
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate('/events'); 
  };

  return (
    <>
    <Box sx={{textAlign:'center',margin:"50px", padding:"50px"}}>
      <h2>Manage Your Events Here...</h2>
    </Box>
    <EventForm mode="add" onSuccess={handleSuccess} />

    </>
   
  )
}

export default CreateEvent