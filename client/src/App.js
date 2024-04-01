import React from 'react';
import Form from './CreateTicketForm';
import TicketList from './ListOfTickets';

function App() {
  return (
    <div className="App">
      <Form />

      <TicketList />
    </div>
  );
}

export default App;