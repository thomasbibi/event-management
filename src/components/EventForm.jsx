import React, { useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useForm } from "react-hook-form";
import { useDispatch } from 'react-redux';
import { createEventAsync, editEventAsync } from '../slices/eventsSlice';
import axios from 'axios';

const EventForm = ({ mode = 'add', initialData = {}, id = null, onSuccess }) => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      eventName: '',
      date: '',
      description: '',
    },
  });

  useEffect(() => {
    if (mode === 'edit' && Object.keys(initialData).length > 0) {
      reset(initialData); // Reset form only if in edit mode and initialData has values
    }
  }, [initialData, reset, mode]);

  const formSubmit = async (data) => {
    try {
      if (mode === 'add') {
        await dispatch(createEventAsync(data)).unwrap();
      } else if (mode === 'edit' && id) {
        await dispatch(editEventAsync({ id, eventData: data })).unwrap();
      }
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error(`Error ${mode === 'add' ? 'creating' : 'updating'} event:`, error);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(formSubmit)}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        maxWidth: 400,
        margin: 'auto',
      }}
    >
      <TextField
        label="Event Name"
        {...register("eventName", { required: "Event name is required" })}
        error={!!errors.eventName}
        helperText={errors.eventName ? errors.eventName.message : ''}
        fullWidth
      />

      <TextField
        label=""
        type="date"
        {...register("date", { required: "Event date is required" })}
        error={!!errors.date}
        helperText={errors.date ? errors.date.message : ''}
        fullWidth
      />

      <TextField
        label="Description"
        {...register("description", { required: "Description is required" })}
        error={!!errors.description}
        helperText={errors.description ? errors.description.message : ''}
        fullWidth
        multiline
        rows={4}
      />

      <Button type="submit" variant="contained" color="primary">
        {mode === 'add' ? 'Create Event' : 'Update Event'}
      </Button>
    </Box>
  );
};

export default EventForm;
