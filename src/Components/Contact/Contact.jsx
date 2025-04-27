import React from 'react'
import ChatBox from './ChatBox.jsx'
import { Container, Typography } from '@mui/material'

const Contact = () => {
  return (
    <Container sx={{ marginTop: 4 }}>
        <Typography variant="h1" color="primary.main">
            Contact Us
        </Typography>
        <ChatBox />
    </Container>
  );
};

export default Contact;