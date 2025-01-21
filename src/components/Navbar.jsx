import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {  Link } from "react-router";


const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Event Manager
        </Typography>
        <Button color="inherit"><Link to="/" style={{textDecoration:'none',color: 'inherit'}}>Home</Link></Button>
        <Button color="inherit"><Link to="/events" style={{textDecoration:'none',color: 'inherit'}}>Events</Link></Button>
        <Button color="inherit"><Link to="/profile" style={{textDecoration:'none',color: 'inherit'}}>Profile</Link></Button>
        <Button color="inherit"><Link to="/create" style={{textDecoration:'none',color: 'inherit'}}>Add</Link></Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
