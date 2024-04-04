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


  const formatDate = (dateTimeString) => {
    return new Date(dateTimeString).toLocaleString(); // Change date and time format here
  };

  return (
    <div>
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

      <h1>Tickets List</h1>
      <Link to="/addticket" className="button">Add Ticket</Link>
      {loading ? (
  <p>Loading...</p>
) : (
  <div className="table-container">
    <table  className="table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Description</th>
          <th>Contact</th>
          <th>Create TimeStamp</th>
          <th>Latest Update TimeStamp</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {sortedAndFilteredTickets.map(ticket => (
          <tr key={ticket.id}>
            <td>{ticket.title}</td>
            <td>{ticket.description}</td>
            <td>{ticket.contact}</td>
            <td>{formatDate(ticket.createdTimestamp)}</td>
            <td>{formatDate(ticket.lastestUpdateTimestamp)}</td>
            <td>{ticket.status}</td>
            <td><Link to={`/update/${ticket.id}`}  className="button">Update</Link></td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}
    </div>
  );
}

export default TicketList;
