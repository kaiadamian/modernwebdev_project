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
  ListItemText,
} from '@mui/material';

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const previousMessageCount = useRef(0);
  const audioRef = useRef(null);
  const messageEndRef = useRef(null);

  const fetchMessages = async () => {
    const Message = Parse.Object.extend('Message');
    const query = new Parse.Query(Message);
    query.ascending('createdAt');
    const results = await query.find();

    if (results.length > previousMessageCount.current) {
      // a new message came in
      if (audioRef.current) {
        audioRef.current.play(); // play the sound 
      }
    }
    previousMessageCount.current = results.length;
    setMessages(results);
  };

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!Parse.User.current()) {
      alert("You must be logged in to send messages.");
      return;
    }
    if (!newMessage.trim()) return;
    const Message = Parse.Object.extend('Message');
    const message = new Message();
    message.set('text', newMessage);
    message.set('sender', Parse.User.current());
    await message.save();
    setNewMessage('');
    fetchMessages();
  };

  return (
    <Box sx={{ maxWidth: 500, margin: 'auto', mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Chat with Admin
      </Typography>
      <Paper elevation={3} sx={{ height: 300, overflowY: 'auto', mb: 2, p: 2 }}>
        <List>
          {messages.map((msg, idx) => (
            <ListItem key={idx}>
              <ListItemText
                primary={
                  <strong>
                    {msg.get('sender')?.id === Parse.User.current()?.id ? 'You' : 'Admin'}:
                  </strong>
                }
                secondary={msg.get('text')}
              />
            </ListItem>
          ))}
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
