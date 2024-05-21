import React, { useState, useEffect } from 'react';
import DbAPI from './DbAPI';
import axios from 'axios';

const FetchData = ({accessApi, paramsApi}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {

      try {
        const response = await axios.post('http://localhost:8080/v1/auth/login', {
            login: "felipe.oliveira@unesp.br",
            password: "123456"
        });
        setData(response.data.token);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <DbAPI tokenBearer={data} typeAccess={accessApi} params={paramsApi}/>
    </div>
  );
};

export default FetchData;