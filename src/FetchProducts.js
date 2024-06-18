import { useState, useEffect } from 'react';
import axios from 'axios';

export default function FetchProducts(tokenBearer, typeAccess, params) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(typeAccess, {
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

    fetchData();
  }, [params, tokenBearer, typeAccess]);

  return { data, loading, error };
}