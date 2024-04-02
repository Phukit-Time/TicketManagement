import React from 'react';
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
      element: <TicketList />,
    },
    {
      path: "/addticket",
      element: <Form />,
    },
    {
      path: "/update/:id",
      element: <Update />,
    },
  ])

  return (
      <RouterProvider router={router} />
  );
}

export default App;