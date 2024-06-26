import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [itemsList, setItemsList] = useState([]);

  const addToList = (items) => {
    const newList = {
      essenciais: items.filter(item => item.star),
      comuns: items.filter(item => !item.star),
    };
    setItemsList(newList);
  };

  return (
    <CartContext.Provider value={{ itemsList, addToList }}>
      {children}
    </CartContext.Provider>
  );
};