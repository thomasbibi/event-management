import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateProfile } from '../slices/profileSlice';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

const UserProfile = () => {
  const profile = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: profile.name || '',
    email: profile.email || '',
    bio: profile.bio || '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProfile(formData));
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          maxWidth: 400,
          margin: 'auto',
          marginTop: 10,
          padding: 4,
          border: '1px solid #ccc',
          borderRadius: '8px',
        }}
      >
        <TextField
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          fullWidth
          required
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          fullWidth
          required
        />
        <TextField
          label="Bio"
          name="bio"
          value={formData.bio}
          onChange={handleInputChange}
          fullWidth
          multiline
          rows={4}
        />
        <Button type="submit" variant="contained" color="primary">
          Save Profile
        </Button>
        <Button
          onClick={() => setIsEditing(false)}
          variant="outlined"
          color="secondary"
        >
          Cancel
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ textAlign: 'center', margin: 5, padding: '50px' }}>
      {profile.name ? (
        <>
          <Box mb={4}>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2TgOv9CMmsUzYKCcLGWPvqcpUk6HXp2mnww&s"
              alt="dummy_img"
              style={{ borderRadius: '50%', width: '150px', height: '150px' }}
            />
          </Box>
          <Typography variant="h4">Profile Details</Typography>
          <Typography>
            <strong>Name:</strong> {profile.name}
          </Typography>
          <Typography>
            <strong>Email:</strong> {profile.email}
          </Typography>
          <Typography>
            <strong>Bio:</strong> {profile.bio}
          </Typography>
          <Typography variant="h5" mt={4} mb={2}>
            Attending Events
          </Typography>
          {profile.rsvpedEvents.length > 0 ? (
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 2,
                justifyContent: 'center',
              }}
            >
              {profile.rsvpedEvents.map((event) => (
                <Card
                  key={event.id}
                  sx={{
                    width: 250,
                    boxShadow: 3,
                    borderRadius: 2,
                    overflow: 'hidden',
                  }}
                >
                  <CardMedia
                    component="img"
                    height="140"
                    image={event.img[0]}
                    alt={event.eventName}
                  />
                  <CardContent>
                    <Typography variant="h6" component="div">
                      {event.eventName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {event.description}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Box>
          ) : (
            <Typography>No events RSVP’d yet.</Typography>
          )}
          <Button
            variant="outlined"
            onClick={() => setIsEditing(true)}
            color="primary"
            sx={{ marginTop: 2 }}
          >
            Edit Profile
          </Button>
        </>
      ) : (
        <>
          <Typography variant="h4">No Profile Found</Typography>
          <Typography>You haven't added your profile yet.</Typography>
          <Button
            variant="contained"
            onClick={() => setIsEditing(true)}
            color="primary"
            sx={{ marginTop: 2 }}
          >
            Add Profile
          </Button>
        </>
      )}
    </Box>
  );
};

export default UserProfile;
