import React, { useEffect, useState, useRef } from 'react';
import Parse from '../../parseConfig';
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

import { formatDistanceToNow } from 'date-fns'; // for relative times 


const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const previousMessageCount = useRef(0);
  const audioRef = useRef(null);
  const [hasInteracted, setHasInteracted] = useState(false); 
  const messageEndRef = useRef(null);
  const [resumed, setResumed] = useState(false); // if the user logs back in, their history is saved


  const fetchMessages = async () => {
    const currentUser = Parse.User.current();
    if (!currentUser) return;
  
    const userQuery = new Parse.Query(Parse.User);
    userQuery.equalTo('username', 'admin@nd.edu');
    const adminUser = await userQuery.first();
  
    const Message = Parse.Object.extend('Message');
  
    const sentByUser = new Parse.Query(Message);
    sentByUser.equalTo('sender', currentUser);
    sentByUser.equalTo('receiver', adminUser);
  
    const sentByAdmin = new Parse.Query(Message);
    sentByAdmin.equalTo('sender', adminUser);
    sentByAdmin.equalTo('receiver', currentUser);
  
    const combinedQuery = Parse.Query.or(sentByUser, sentByAdmin);
    combinedQuery.ascending('createdAt');
  
    const results = await combinedQuery.find();
  
    if (
      results.length > previousMessageCount.current &&
      hasInteracted &&
      audioRef.current
    ) {
      audioRef.current.play().catch(() => {});
    }
    
  
    previousMessageCount.current = results.length;
    setMessages(results);
  };
  

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 3000);
    return () => clearInterval(interval);
  }, []);

  // showing messages
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // messages after logging back in 
  useEffect(() => {
    const user = Parse.User.current();
    if (user) {
      setResumed(true);
      setTimeout(() => setResumed(false), 5000); // hide after a bit 
    }
    fetchMessages();
    const interval = setInterval(fetchMessages, 3000);
    return () => clearInterval(interval);
  }, []);
  
  // for playing the sound 
  useEffect(() => {
    const handleInteraction = () => setHasInteracted(true);
    window.addEventListener('click', handleInteraction, { once: true });
    return () => window.removeEventListener('click', handleInteraction);
  }, []);
  

  const sendMessage = async () => {
    if (!Parse.User.current()) {
      alert("You must be logged in to send messages.");
      return;
    }
    if (!newMessage.trim()) return;
  
    // Fetch the admin user by username (only once, could be cached)
    const userQuery = new Parse.Query(Parse.User);
    userQuery.equalTo('username', 'admin@nd.edu');
    const adminUser = await userQuery.first();
  
    const Message = Parse.Object.extend('Message');
    const message = new Message();
    message.set('text', newMessage);
    message.set('sender', Parse.User.current());
    message.set('receiver', adminUser); 
    await message.save();
    setNewMessage('');
    fetchMessages();
  };
  

  return (
    <Box sx={{ maxWidth: 500, margin: 'auto', mt: 4 }}>
      {resumed && (
        <Paper elevation={1} sx={{ p: 1, mb: 2, backgroundColor: '#e0f7fa' }}>
          <Typography variant="body1" align="center" sx={{ color: '#00796b' }}>
            Chat resumed.
          </Typography>
        </Paper>
      )}
      <Typography variant="h5" gutterBottom>
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
            <ListItem
              key={idx}
              sx={{
                justifyContent: isYou ? 'flex-end' : 'flex-start',
              }}
            >
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

export default ChatBox;
