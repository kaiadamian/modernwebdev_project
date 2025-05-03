/* ChatBox - Stateful Parent Component for Contact Page */

/* Instead of payng for liveQuery, we used polling for longevity since we launched our website through Netlify. 
Every few seconds, fetchMessagesForCurrentUser is called to retrieve new messages between the logged-in user and 
the admin page (back4app manual editing).  */ 

import React, { useEffect, useRef, useState } from 'react';
import Parse from '../../parseConfig';
import { fetchMessagesForCurrentUser, sendMessageToAdmin } from '../../Common/Services/MessageService';
import ChatBoxView from './ChatBoxView';

const ChatBox = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [resumed, setResumed] = useState(false);
    const [hasInteracted, setHasInteracted] = useState(false);
    const previousMessageCount = useRef(0);
    const audioRef = useRef(null); // should play the alert sound (wonky at times)
    const messageEndRef = useRef(null); // scrolls to the newest message

    const fetchMessages = () => {
        fetchMessagesForCurrentUser()
        .then((results) => {
            if (
            results.length > previousMessageCount.current &&
            hasInteracted &&
            audioRef.current
            ) {
            audioRef.current.play().catch(() => {});
            }
            previousMessageCount.current = results.length;
            setMessages(results);
        })
        .catch((error) => console.error('Error fetching messages:', error));
    };
// start polling every 3 seconds to simulate live chat 
    useEffect(() => {
        fetchMessages();
        const interval = setInterval(fetchMessages, 3000);
        return () => clearInterval(interval);
    }, []);
// display a banner to let the user know their previous session has been restored
    useEffect(() => {
        const user = Parse.User.current();
        if (user) {
        setResumed(true);
        setTimeout(() => setResumed(false), 5000);
        }
    }, []);

// save the message in the parse database
    useEffect(() => {
        const handleInteraction = () => setHasInteracted(true);
        window.addEventListener('click', handleInteraction, { once: true });
        return () => window.removeEventListener('click', handleInteraction);
    }, []);

    const sendMessage = () => {
        if (!Parse.User.current()) {
        alert("You must be logged in to send messages.");
        return;
        }
        if (!newMessage.trim()) return;

        sendMessageToAdmin(newMessage)
        .then(() => {
            setNewMessage('');
            fetchMessages(); // refresh after sending
        })
        .catch((error) => {
            console.error('Error sending message:', error);
            alert('Failed to send message.');
        });
    };
    
// render the stateless component
    return (
        <ChatBoxView
        messages={messages}
        newMessage={newMessage}
        setNewMessage={setNewMessage}
        sendMessage={sendMessage}
        resumed={resumed}
        audioRef={audioRef}
        messageEndRef={messageEndRef}
        />
    );
};

export default ChatBox;
