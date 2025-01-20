import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Container, Typography, TextField, Button, Box, Grid } from '@mui/material';

function UpdateBusinessInfo() {
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
        Update Business Information
      </Typography>
      <Typography variant="body1" gutterBottom>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque fermentum iaculis eros et commodo. Aenean volutpat quis nibh sit amet lacinia. Sed hendrerit odio vel tellus suscipit pretium. Maecenas aliquet risus at purus dapibus, id interdum justo tincidunt. Phasellus sit.
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
          <TextField
            label="Business Name"
            variant="outlined"
            fullWidth
            disabled={!isEditing}
            {...register("businessName")}
          />
          <TextField
            label="Business Address"
            variant="outlined"
            fullWidth
            disabled={!isEditing}
            {...register("businessAddress")}
          />
          <TextField
            label="Business City"
            variant="outlined"
            fullWidth
            disabled={!isEditing}
            {...register("businessCity")}
          />
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Business State"
                variant="outlined"
                fullWidth
                disabled={!isEditing}
                {...register("businessState", {
                  pattern: /\b(?:Alabama|Alaska|Arizona|Arkansas|California|Colorado|Connecticut|Delaware|Florida|Georgia|Hawaii|Idaho|Illinois|Indiana|Iowa|Kansas|Kentucky|Louisiana|Maine|Maryland|Massachusetts|Michigan|Minnesota|Mississippi|Missouri|Montana|Nevada|New\s+Hampshire|New\s+Jersey|New\s+Mexico|New\s+York|North\s+Carolina|North\s+Dakota|Ohio|Oklahoma|Oregon|Pennsylvania|Rhode\s+Island|South\s+Carolina|South\s+Dakota|Tennessee|Texas|Utah|Vermont|Virginia|Washington|West\s+Virginia|Wisconsin|Wyoming|Nebraska)/i,
                })}
                error={!!errors.businessState}
                helperText={errors.businessState ? "Invalid state" : ""}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Business Zip"
                variant="outlined"
                fullWidth
                disabled={!isEditing}
                {...register("businessZip", { pattern: /^\d{5}(?:[-\s]\d{4})?$/i })}
                error={!!errors.businessZip}
                helperText={errors.businessZip ? "Invalid zip code" : ""}
              />
            </Grid>
          </Grid>
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

export default UpdateBusinessInfo;