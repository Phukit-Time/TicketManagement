import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

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

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const myData = {
        id: ticketCount,
        ...formData,
        createdTimestamp: new Date().toISOString(),
        lastestUpdateTimestamp: new Date().toISOString(),
        status: "pending"
      };
    // Send form data to the backend
    await fetch('http://localhost:3001/ticket', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(myData)
    })
    navigate("/");
  };

  return (
    <div>
      <Link to="/">All tickets</Link>
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