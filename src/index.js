import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import App from './App';
import Header from './App_router.js'
import reportWebVitals from './reportWebVitals';

import {createBrowserRouter, Navigate, RouterProvider} from 'react-router-dom';
import ErrorScreen from './screens/ErrorScreen.js';

import Home from './screens/Home.js';
import Contact from './screens/Contact.js';

import ItemScreen from './screens/ItemScreen.js';
import Item from './screens/Item.js';

import CadastrarScreen from './screens/CadastrarScreen.js';
import Login from './screens/Login.js';
import Logout from './screens/Logout.js';
import AddItems from './screens/AddItem.js';

const router = createBrowserRouter([
    {
        path: "/",
        element: <Header />,
        errorElement: <ErrorScreen/>,
        children: [
          {
              path: "/",
              element: <Home />
            },
            {
              path: "contact",
              element: <Contact />
            },
            {
              path: "itens",
              element: <ItemScreen />
            }, 
            {
              path: "additem",
              element: <AddItems />
            },              
            {
              path: "/item/:id",
              element: <Item />
            },
            {
              path: "/login",
              element: <Login />
            },              
            {
              path: "/cadastrar",
              element: <CadastrarScreen />
            },
            {
              path: "/logout",
              element: <Logout />
            },                              
            {
              path:"oldpage",
              element: <Navigate to="/" />
            }

        ]
    }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <RouterProvider router={router}/>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();