import React from 'react';
import { CssBaseline, Container, Box, Typography, Paper } from '@mui/material';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          width: '100%',
          height: '300px',
          position: 'relative',
          overflow: 'hidden',
          mb: 4
        }}
      >
        {/* Hero Image */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'url("https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.5)'
            }
          }}
        />
        
        {/* Hero Content */}
        <Container maxWidth="lg" sx={{ position: 'relative', height: '100%' }}>
          <Box
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              color: 'white'
            }}
          >
            <Typography
              variant="h2"
              component="h1"
              sx={{
                fontWeight: 700,
                textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
              }}
            >
              Indian Stock Market
            </Typography>
            <Typography
              variant="h5"
              sx={{
                mt: 2,
                maxWidth: 600,
                textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
              }}
            >
              Real-time market insights, trends, and analysis
            </Typography>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg">
        <Box sx={{ mb: 4 }}>
          <Dashboard />
        </Box>
      </Container>
    </>
  );
}

export default App; 