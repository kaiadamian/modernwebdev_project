/* ChatBoxView - Stateless Child Component for Contact Page */
import React from 'react';
import {
    Box,
    Typography,
    TextField,
    Button,
    Paper,
    List,
    ListItem,
    Tooltip,
} from '@mui/material';
import { formatDistanceToNow } from 'date-fns';
import Parse from '../../parseConfig';

const ChatBoxView = ({
    messages,
    newMessage,
    setNewMessage,
    sendMessage,
    resumed,
    audioRef,
    messageEndRef,
    }) => {
    return (
        // display the chat box
        <Box sx={{ maxWidth: 500, margin: 'auto', mt: 4 }}>
        {resumed && (
            <Paper elevation={1} sx={{ p: 1, mb: 2, backgroundColor: '#e0f7fa' }}>
            <Typography variant="body1" align="center" sx={{ color: '#00796b' }}>
                Chat resumed.
            </Typography>
            </Paper>
        )}

        <Typography variant="h5" color="primary.main" gutterBottom>
            Chat with Admin
        </Typography>

        <Paper elevation={3} sx={{ height: 300, overflowY: 'auto', mb: 2, p: 2 }}>
            <List>
            {messages.map((msg, idx) => {
                const currentUser = Parse.User.current();
                const isYou = msg.get('sender')?.id === currentUser?.id;
                const isAdmin = msg.get('sender')?.get('username') === 'admin@nd.edu';
                const createdAt = msg.createdAt;

                return (
                <ListItem key={idx} sx={{ justifyContent: isYou ? 'flex-end' : 'flex-start' }}>
                    <Box
                    sx={{
                        bgcolor: isYou ? '#e3f2fd' : '#f0f0f0',
                        color: 'black',
                        p: 1.2,
                        px: 2,
                        borderRadius: 2,
                        maxWidth: '70%',
                        display: 'inline-block',
                    }}
                    >
                    <Typography variant="body2" fontWeight="bold" gutterBottom>
                        {isYou ? 'You' : isAdmin ? 'Admin' : msg.get('sender')?.get('username')}
                    </Typography>
                    <Typography variant="body1">{msg.get('text')}</Typography>
                    {createdAt && (
                        <Tooltip title={createdAt.toLocaleString()} arrow>
                        <Typography
                            variant="caption"
                            sx={{ color: 'gray', mt: 0.5, display: 'block', textAlign: 'right' }}
                        >
                            {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
                        </Typography>
                        </Tooltip>
                    )}
                    </Box>
                </ListItem>
                );
            })}
            <div ref={messageEndRef} />
            </List>
        </Paper>

        <Box display="flex">
            <TextField
            fullWidth
            variant="outlined"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message!"
            />
            <Button variant="contained" onClick={sendMessage}>
            Send
            </Button>
        </Box>

        <audio ref={audioRef} src="/alertnoise.mp3" preload="auto" />
        </Box>
    );
};

export default ChatBoxView;
