import React from 'react'
import './index.css'
import ReactDOM from 'react-dom/client'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";


import Root, {
  loader as rootLoader,
  action as rootAction,
} from "./routes/root";

import Contact, {
  loader as contactLoader,
  action as contactAction,
} from './routes/contact';

import EditContact, {
  action as editAction,
} from './routes/edit';
import ErrorPage from './error-page';
import { action as destroyAction } from "./routes/destroy";
import Index from "./routes/index";

// Create a BrowserRouter with defined routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    loader: rootLoader,
    action: rootAction,
    errorElement: <ErrorPage />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <Index /> }, // Index route
        {
          path: "contacts/:contactId",
          element: <Contact />,
          loader: contactLoader,
          action: contactAction,
        },
        {
          path: "contacts/:contactId/edit",
          element: <EditContact />,
          loader: contactLoader,
          action: editAction,
        },
        {
          path: "contacts/:contactId/destroy",
          action: destroyAction,
          errorElement: <div>Oops! There was an error.</div>,
        },
        ],
      },
    ],
  },

]);

// Render the BrowserRouter using React StrictMode
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
