import React from 'react';
import { Box, Typography, Container, Link } from '@mui/material';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: "#d8e2dc",
      }}
    >
      <Container sx={{ backgroundColor: "#d8e2dc", color: "black"}}>
        <Typography variant="body1" align="center">
          © {new Date().getFullYear()} Il Tuo Nome o Azienda. Tutti i diritti riservati.
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center" mt={1}>
          <Link href="/privacy" color="inherit" underline="hover">
            Privacy Policy
          </Link>{' '}|{' '}
          <Link href="/terms" color="inherit" underline="hover">
            Termini e Condizioni
          </Link>
        </Typography>
      </Container>
    </Box>
  );
}
