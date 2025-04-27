import React from 'react'
import ChatBox from './ChatBox.jsx'
import { Container, Typography, Paper } from '@mui/material'

const Contact = () => {
  return (
    <Container sx={{ marginTop: 4 }}>
        <Paper sx={{ backgroundColor: '#ffffff', padding: 2, display: 'flex', justifyContent: 'center' }}>
            <Typography variant="h1" color="primary.main">
                Contact Us
            </Typography>
        </Paper>
        <ChatBox />
    </Container>
  );
};

export default Contact;