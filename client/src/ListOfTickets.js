import React, { useState, useEffect } from 'react';

function TicketList() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const response = await fetch('http://localhost:3000/tickets');
      if (!response.ok) {
        throw new Error('Failed to fetch tickets');
      }
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const data = await response.json();
        setTickets(data);
        console.log(data); // Logging fetched data
      } else {
        throw new Error('Invalid content type: expected JSON');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Tickets</h1>
      <ul>
        {tickets.map((ticket, index) => (
          <li key={index}>
            <h3>{ticket.title}</h3>
            <p>{ticket.description}</p>
            <p>Contact: {ticket.contact}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TicketList;
