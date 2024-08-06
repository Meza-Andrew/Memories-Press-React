import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Container, TextField, Button, Grid, Box, Typography } from '@mui/material';

function UpdateContactInfo() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [isEditing, setIsEditing] = useState(true);

  const onSubmit = data => {
    console.log(data);
    setIsEditing(false);
  };

  return (
    <Container
      maxWidth="sm"
      sx={{ 
        mt: 4, 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center', 
        justifyContent: 'flex-start', 
        textAlign: 'center', 
        gap: 2,
      }}
    >
      <Typography variant="h6" gutterBottom>
        Update Contact Information
      </Typography>
      <Typography variant="body1" gutterBottom>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque fermentum iaculis eros et commodo. Aenean volutpat quis nibh sit amet lacinia. Sed hendrerit odio vel tellus suscipit pretium. Maecenas aliquet risus at purus dapibus, id interdum justo tincidunt. Phasellus sit.
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="First Name"
                variant="outlined"
                fullWidth
                disabled={!isEditing}
                {...register("firstName", { required: "First Name is required" })}
                error={!!errors.firstName}
                helperText={errors.firstName ? "First Name is required" : ""}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Last Name"
                variant="outlined"
                fullWidth
                disabled={!isEditing}
                {...register("lastName", { required: "Last Name is required" })}
                error={!!errors.lastName}
                helperText={errors.lastName ? "Last Name is required" : ""}
              />
            </Grid>
          </Grid>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            disabled={!isEditing}
            {...register("email", { required: "Email is required" })}
            error={!!errors.email}
            helperText={errors.email ? errors.email.message : ""}
          />
          <TextField
            label="Phone"
            variant="outlined"
            fullWidth
            disabled={!isEditing}
            {...register("phone")}
          />
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Button
                color='secondary'
                variant="contained"
                fullWidth
                onClick={() => setIsEditing(true)}
                disabled={isEditing}
              >
                Edit
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={!isEditing}
              >
                Update
              </Button>
            </Grid>
          </Grid>
        </Box>
      </form>
    </Container>
  );
}

export default UpdateContactInfo;
