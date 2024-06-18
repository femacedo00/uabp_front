import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [itemsList, setItemsList] = useState([]);

  const addToList = (items) => {
    setItemsList(items);
  };

  return (
    <CartContext.Provider value={{ itemsList, addToList }}>
      {children}
    </CartContext.Provider>
  );
};