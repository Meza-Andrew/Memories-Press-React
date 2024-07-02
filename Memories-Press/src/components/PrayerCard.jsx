import { Box, Card, CardContent, Stack, Typography } from '@mui/material'
import React from 'react'

function PrayerCard({ title, listDisplay }) {
  const cardContent = (
    <Card
      sx={{
        width: 81,
        height: 108,
        backgroundColor: "cyan",
        borderRadius: 1.25,
        padding: 0,
        margin: 0,
      }}
    >
      <CardContent>
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={0}
        >
          <Box
            sx={{
              width: 44,
              height: 44,
              borderRadius: 5.5,
              backgroundColor: "lightblue",
            }}
          />
          <Typography variant="p">Name</Typography>
          <Typography variant="p">Lifespan</Typography>
        </Stack>
      </CardContent>
    </Card>
  );

  if (!listDisplay) {
    return cardContent;
  }

  return (
    <Stack
      direction="row"
      backgroundColor="pink"
      height={133}
      width={330}
    >
      {cardContent}
      <Typography>{title}</Typography>
    </Stack>
  );
}

export default PrayerCard;
