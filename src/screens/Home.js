import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';

export default function LoginScreen() {
  const navigate = useNavigate();

  const handleCreateCart = (e) => {
    e.preventDefault();
    localStorage.getItem("token") ? navigate('/listing') : navigate('/')
    navigate("/");
  }

  return (
    <div className="Home">
      <div className="Conteudo">
        <h1>Escolha o supermercado <br></br> ideal antes de sair de <br></br> casa!</h1>
        <button onClick={handleCreateCart}>Criar Carrinho</button>
      </div>
    </div>
  );
}