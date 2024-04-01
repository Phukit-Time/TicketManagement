import React, { useState } from 'react';

function Form() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    contact: ''
  });

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