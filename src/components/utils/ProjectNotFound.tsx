import { Box, Card, CardContent, Typography } from '@mui/material';
import React from 'react';

const ProjectNotFound = () => {
  return (
    <Box
      textAlign="center"
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="50vh"
    >
      <Card
        sx={{
          maxWidth: 400,
          padding: 5,
          boxShadow: 3,
          borderRadius: 2,
        }}
      >
        <CardContent>
          <Typography variant="h2" color="error">
            Unable to fetch project data.
          </Typography>
          <Typography variant="body1" gutterBottom>
            Please contact the system administrator to resolve the issue, or
            refresh page again.
          </Typography>
          <Typography variant="h1">¯\_(ツ)_/¯</Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ProjectNotFound;
