import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Container, TextField, Button, Grid, Box, Typography } from '@mui/material';

function UpdatePaymentInfo() {
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
        Update Payment Information
      </Typography>
      <Typography variant="body1" gutterBottom>
        Please update your payment information below. Ensure that all details are accurate before submitting.
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
          <TextField
            label="Card Number"
            variant="outlined"
            fullWidth
            disabled={!isEditing}
            {...register("cardNumber", { required: "Card Number is required", pattern: /^\d{16}$/ })}
            error={!!errors.cardNumber}
            helperText={errors.cardNumber ? "Card Number must be 16 digits" : ""}
          />
          <TextField
            label="Card Holder Name"
            variant="outlined"
            fullWidth
            disabled={!isEditing}
            {...register("cardHolderName", { required: "Card Holder Name is required" })}
            error={!!errors.cardHolderName}
            helperText={errors.cardHolderName ? "Card Holder Name is required" : ""}
          />
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Expiration Date"
                variant="outlined"
                fullWidth
                disabled={!isEditing}
                {...register("expirationDate", { required: "Expiration Date is required", pattern: /^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/ })}
                error={!!errors.expirationDate}
                helperText={errors.expirationDate ? "Expiration Date must be MM/YY" : ""}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="CVV"
                variant="outlined"
                fullWidth
                disabled={!isEditing}
                {...register("cvv", { required: "CVV is required", pattern: /^[0-9]{3,4}$/ })}
                error={!!errors.cvv}
                helperText={errors.cvv ? "CVV must be 3 or 4 digits" : ""}
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

export default UpdatePaymentInfo;