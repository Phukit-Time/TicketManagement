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
    if (err) {
      console.error('Error reading ticket file:', err);
      res.status(500).send('Internal Server Error');
    } else {
      const tickets = JSON.parse(data);
      res.json(tickets);
    }
  });
});


// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});