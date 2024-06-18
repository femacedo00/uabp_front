import React, { useState } from 'react';
import FetchLogin from '../FetchLogin.js';
import { useNavigate } from 'react-router-dom';

export default function LoginScreen({tipo: login, setUser, handleClose}) {
  const buttonName = login === true ? "Acessar" : "Registrar";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const [typeAccess, userDetails] = login ? 
      ['http://localhost:8080/v1/auth/login', { login: email, password: password }] 
      : ['http://localhost:8080/v1/auth/register', {login: email, password: password, name: name }];

    const { data, error } = await FetchLogin(typeAccess, userDetails);

    setLoading(false);
    if (error) {
      setError(error);
      return;
    }

    localStorage.setItem("token", data);
    localStorage.setItem("user", email);
    setUser(email);
    handleClose();
    navigate('/listing')
  };

  return (
    <div>
      <form className='UserSubmit' onSubmit={handleSubmit}>
        {!login && <input type="text" placeholder="Nome" id="name" value={name} onChange={(e) => setName(e.target.value)} required />}
        <input type="email" placeholder="E-mail" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Senha" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit" disabled={loading}>{buttonName}</button>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
      </form>
    </div>
  );
}