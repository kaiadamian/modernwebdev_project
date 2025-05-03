/* ChatBox - Stateful Parent Component for Contact Page */
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
    const audioRef = useRef(null);
    const messageEndRef = useRef(null);

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

    useEffect(() => {
        fetchMessages();
        const interval = setInterval(fetchMessages, 3000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const user = Parse.User.current();
        if (user) {
        setResumed(true);
        setTimeout(() => setResumed(false), 5000);
        }
    }, []);

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
            fetchMessages();
        })
        .catch((error) => {
            console.error('Error sending message:', error);
            alert('Failed to send message.');
        });
    };

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
