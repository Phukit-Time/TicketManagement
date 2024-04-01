import React, { useState, useEffect } from 'react';

function Form() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    contact: ''
  });
  const [ticketCount, setTicketCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/tickets');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        // Set the ticket count to the length of the data array
        setTicketCount(data.length);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedFormData = {
        id: ticketCount,
        ...formData,
        createdTimestamp: new Date().toISOString(),
        lastestUpdateTimestamp: new Date().toISOString(),
        status: "pending"
      };
    // Send form data to the backend
    fetch('http://localhost:3001/ticket', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedFormData)
    })
    .then(response => {
      if (response.ok) {
        console.log('Ticket created successfully!');
        // You can redirect or perform any other action upon successful creation
      } else {
        console.log('Failed to create ticket');
      }
    })
    .catch(error => {
      console.log('Error creating ticket:', error);
    });
  };

  return (
    <div>
      <h1>Create Ticket</h1>
      <p>Total Tickets: {ticketCount}</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Contact:</label>
          <input
            type="text"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default Form;