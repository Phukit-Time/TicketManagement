import React, { useState, useEffect } from 'react';

function TicketList() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/tickets');
        const data = await response.json();
        setTickets(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <ul>
        {tickets.map(ticket => (
          <li key={ticket.id}>
            <h2>{ticket.title}</h2>
            <p>{ticket.description}</p>
            <p>Contact: {ticket.contact}</p>
            <p>Created Timestamp: {ticket.createdTimestamp}</p>
            <p>Latest Ticket Update Timestamp: {ticket.latestUpdateTimestamp}</p>
            <p>Status: {ticket.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TicketList;
