import React from 'react';
import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import Form from './CreateTicketForm';
import TicketList from './ListOfTickets';
import Update from './Update';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <div className='body'><TicketList /></div>,
    },
    {
      path: "/addticket",
      element: <div className='body'><Form /></div>,
    },
    {
      path: "/update/:id",
      element: <div className='body'><Update /></div>,
    },
  ])

  return (
      <RouterProvider router={router} />
  );
}

export default App;