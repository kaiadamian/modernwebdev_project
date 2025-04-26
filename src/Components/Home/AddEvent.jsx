// src/Components/Home/AddEvent.jsx
import React, { useState } from 'react';

const AddEvent = () => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('New Event Added:', { title, date });

    // In the future, you can send this to your server here

    // Clear the form after submission
    setTitle('');
    setDate('');
  };

  return (
    <div className="add-event-container">
      <h1>Add a New Event</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            required
          />
        </div>
        <div>
          <label>Date:</label>
          <input 
            type="date" 
            value={date} 
            onChange={(e) => setDate(e.target.value)} 
            required
          />
        </div>
        <button type="submit">Add Event</button>
      </form>
    </div>
  );
};

export default AddEvent;
