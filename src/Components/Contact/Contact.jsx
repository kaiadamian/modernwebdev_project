/* Contact Page - Routed Container Component */
import React from 'react'
import ChatBox from './ChatBox.jsx'
import { Container, Typography, Paper, Grow } from '@mui/material'
import EmailIcon from '@mui/icons-material/Email'
import PhoneIcon from '@mui/icons-material/Phone'

const Contact = () => {
    return (
        // display contact information
        <Container sx={{ marginTop: 4 }}>
            <Grow in={true} timeout={500}>
                <Paper sx={{ backgroundColor: '#ffffff', padding: 2, display: 'flex', justifyContent: 'center' }}>
                    <Typography variant="h1" color="primary.main">
                        Contact Us
                    </Typography>
                </Paper>
            </Grow>
            <Grow in={true} timeout={500}>
            <Paper sx={{ backgroundColor: '#ffffff', padding: 2, display: 'flex', justifyContent: 'center', marginTop: 1 }}>
                <Typography variant="body1" color="primary.main">
                    <EmailIcon sx={{ marginRight: 1, verticalAlign: 'middle' }}/> residentiallife@nd.edu
                    <PhoneIcon sx={{ marginLeft: 1, verticalAlign: 'middle' }}/> (574) 631-5878
                </Typography>
            </Paper>
            </Grow>
            {/* display chatbox */}
            <ChatBox />
        </Container>
    );
};

export default Contact;