import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Footer = () => {
  return (
    <Box
      sx={{
        bgcolor: 'primary.main',
        color: 'white',
        textAlign: 'center',
        py: 2,
        mt: 4,
      }}
    >
      <Typography variant="body2">© 2025 Event Manager. All Rights Reserved.</Typography>
    </Box>
  );
};

export default Footer;
