import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from './Header.js'
import reportWebVitals from './reportWebVitals';

import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import ErrorScreen from './screens/ErrorScreen.js';

import Home from './screens/Home.js';
import Comparar from './screens/Comparar.js';
import ProductsScreen from './screens/ProductsScreen.js';

import Login from './screens/Login.js';
import Logout from './screens/Logout.js';
import { CartProvider } from '../src/context/CartContext.js';

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
              path: "/login",
              element: <Login />
            },
            {
              path: "/comparar",
              element: <Comparar />
            },
            {
              path: "/logout",
              element: <Logout />
            },
            {
              path: "/listing",
              element: <ProductsScreen />
            },
        ]
    }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <CartProvider>
    <RouterProvider router={router}/>
  </CartProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();