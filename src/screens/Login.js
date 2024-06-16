import React, { useState, useEffect } from 'react';

export default function LoginScreen(props) {
  const login = props.tipo;
  const buttonName = login === true ? "Acessar" : "Registrar";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [callAPI, setCallAPI] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      console.log(login);
    };

    if(callAPI) fetchData();
  }, [callAPI, login]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCallAPI(callAPI => callAPI + 1);
  };

  return (
    <div>
      <form className='UserSubmit' onSubmit={handleSubmit}>
        {login === true ? null : <input type="text" placeholder="Nome" id="name" value={name} onChange={(e) => setName(e.target.value)} required/>}
        <input type="email" placeholder="E-mail" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
        <input type="password" placeholder="Senha" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
        <button type="submit">{buttonName}</button>
      </form>
    </div>
  );
}