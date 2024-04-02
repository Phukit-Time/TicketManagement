const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require("cors");

const corsOptions = {
  origin: "http://localhost:3000",
};

const app = express();
const port = 3001;
const ticketFilePath = 'tickets.json';

// Middleware to parse JSON bodies
app.use(bodyParser.json(), cors(corsOptions));

// Function to save ticket data to JSON file
const saveTicketToFile = (ticketData) => {
  fs.readFile(ticketFilePath, 'utf8', (err, data) => {
    if (err) {
      // If file does not exist, create it and add ticket data
      fs.writeFile(ticketFilePath, JSON.stringify([ticketData], null, 2), (err) => {
        if (err) {
          console.error('Error creating ticket file:', err);
        } else {
          console.log('Ticket file created successfully');
        }
      });
    } else {
      // If file exists, append ticket data
      const existingData = JSON.parse(data);
      existingData.push(ticketData);
      fs.writeFile(ticketFilePath, JSON.stringify(existingData, null, 2), (err) => {
        if (err) {
          console.error('Error appending ticket data to file:', err);
        } else {
          console.log('Ticket data appended to file successfully');
        }
      });
    }
  });
};


// Route to handle POST requests to "/ticket"
app.post('/ticket', (req, res) => {
  const ticketData = req.body;
  console.log('Received ticket data:', ticketData);
  
    // Save ticket data to file
    saveTicketToFile(ticketData);

  res.status(201).send('Ticket created successfully');
});

// Route to serve tickets.json
app.get('/tickets', (req, res) => {
  fs.readFile(ticketFilePath, 'utf8', (err, data) => {
      const tickets = JSON.parse(data);
      res.json(tickets);
  });
});

// Route to serve a specific ticket by ID
app.get('/tickets/:id', (req, res) => {
  const { id } = req.params;
  fs.readFile(ticketFilePath, 'utf8', (err, data) => {
      const tickets = JSON.parse(data);
      const ticket = tickets.find(ticket => ticket.id === parseInt(id));
      res.json(ticket);
    
  });
});


// Route to handle PUT requests to update a ticket by ID
app.put('/tickets/:id', (req, res) => {
  const { id } = req.params;
  const updatedTicket = req.body;

  fs.readFile(ticketFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading ticket file:', err);
      res.status(500).send('Internal Server Error');
    } else {
      let tickets = JSON.parse(data);
      const index = tickets.findIndex(ticket => ticket.id === parseInt(id));

      tickets[index] = { ...tickets[index], ...updatedTicket };

        // Write updated data back to the file
        fs.writeFile(ticketFilePath, JSON.stringify(tickets, null, 2), (err) => {
          if (err) {
            console.error('Error updating ticket:', err);
            res.status(500).send('Internal Server Error');
          } else {
            console.log('Ticket updated successfully');
            res.status(200).send('Ticket updated successfully');
          }
        });

    }
  });
});
// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});