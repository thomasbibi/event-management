import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import {  Link, useNavigate } from "react-router";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Box } from '@mui/material';
import { deleteEventAsync } from '../slices/eventsSlice';
import { useDispatch } from 'react-redux';


const EventCard = ({ event, onView, onRSVP }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    if (event?.id) {
      dispatch(deleteEventAsync(event.id));
    }
  };

  const navigate = useNavigate();

  return (
    <Card sx={{ maxWidth: 320, margin: 2, padding:2, backgroundColor:'#eee' }}>
      <CardContent>
        <Box sx={{display:'flex',justifyContent:'space-between', flexWrap:'nowrap', alignItems:'center'}}>
        <Typography gutterBottom variant="h5" component="div" >
        {event?.eventName}
        </Typography>
        <Box>
        <DeleteIcon onClick={handleDelete} sx={{ cursor: 'pointer', color: 'red' }} />
        <EditIcon onClick = {()=>navigate(`/edit/${event?.id}`)}/>
        </Box>
        </Box>
        <Typography variant="body2" color="text.secondary">
         {event?.date}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {event?.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" ><Link to={`/events/${event?.id}`} style={{textDecoration:'none',color: 'inherit'}}>View</Link></Button>
        <Button size="small" ><Link to="/calender" style={{textDecoration:'none',color: 'inherit'}}>RSVP</Link></Button>

      </CardActions>
    </Card>
  );
};

export default EventCard;
