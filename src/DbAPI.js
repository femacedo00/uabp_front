import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DbAPI = ({tokenBearer, typeAccess, params}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const DbAPI = async () => {
      try {
        const response = await axios.post(typeAccess, {
            params,
            headers: {
              Authorization: `Bearer ${tokenBearer}`
            },
            responseType: "json"
        });
        setData(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    DbAPI();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default DbAPI;