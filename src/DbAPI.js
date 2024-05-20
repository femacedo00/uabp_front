import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ItemsDisplay from './screens/ItemsDisplay'
import SearchItems from './screens/ItemsSearch';

const DbAPI = ({tokenBearer, typeAccess, params}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredItems, setFilteredItems] = useState(null);

  useEffect(() => {
    const DbAPI = async () => {
      try {
        const response = await axios.get(typeAccess, {
            params,
            headers: {
              Authorization: `Bearer ${tokenBearer}`
            },
            responseType: "json"
        });
        setData(response.data);
        setFilteredItems(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    DbAPI();
  }, [params, tokenBearer, typeAccess]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const filterItems = (upc_a, categoria, nome, marca) => {
    const filtered = data.filter(item => {
      return (
        (!upc_a || item.upc_a === upc_a) &&
        (!categoria || item.categoria.nome.toLowerCase().includes(categoria.toLowerCase())) &&
        (!nome || item.nome.toLowerCase().includes(nome.toLowerCase())) &&
        (!marca || item.marca.toLowerCase().includes(marca.toLowerCase()))
      );
    });
    setFilteredItems(filtered);
  };

  return (
    <div>
      <SearchItems onSearch={filterItems} />
      <ItemsDisplay items={filteredItems} />  
    </div>
  );
};

export default DbAPI;