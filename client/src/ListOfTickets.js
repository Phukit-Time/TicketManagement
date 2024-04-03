import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function TicketList() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('createdTimestamp');
  const [filterByStatus, setFilterByStatus] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/tickets');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setTickets(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilterByStatus(e.target.value);
  };

  const filteredTickets = tickets.filter(ticket => {
    if (filterByStatus === '') {
      return true; // Show all tickets if no status is selected
    } else {
      return ticket.status === filterByStatus;
    }
  });

  const sortedAndFilteredTickets = [...filteredTickets].sort((a, b) => {
    if (sortBy === 'status') {
      return a[sortBy].localeCompare(b[sortBy]);
    } else {
      return new Date(b[sortBy]) - new Date(a[sortBy]);
    }
  });

  return (
    <div>
      <Link to="/addticket">Add Ticket</Link>
      <div>
        <h2>Sort by:</h2>
        <select value={sortBy} onChange={handleSortChange}>
          <option value="createdTimestamp">Created Timestamp</option>
          <option value="lastestUpdateTimestamp">Last Update Timestamp</option>
          <option value="status">Status</option>
        </select>
      </div>

      <div>
        <h2>Filter by Status:</h2>
        <select value={filterByStatus} onChange={handleFilterChange}>
          <option value="">All</option>
          <option value="Pending">Pending</option>
          <option value="Accepted">Accepted</option>
          <option value="Resolved">Resolved</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      <h1>Ticket List</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {sortedAndFilteredTickets.map(ticket => (
            <li key={ticket.id}>
              <h2>{ticket.title}</h2>
              <p>{ticket.description}</p>
              <p>Contact: {ticket.contact}</p>
              <p>Created Timestamp: {ticket.createdTimestamp}</p>
              <p>Latest Ticket Update Timestamp: {ticket.lastestUpdateTimestamp}</p>
              <p>Status: {ticket.status}</p>
              <Link to={`/update/${ticket.id}`}>Update</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TicketList;
