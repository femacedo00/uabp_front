import React, { useState } from "react";
import styles from "../styles/SearchItems.module.css";

const SearchItems = ({ onSearch }) => {
  const [id, setId] = useState(0);
  const [categoria, setCategoria] = useState("");
  const [nome, setNome] = useState("");
  const [marca, setMarca] = useState("");

  const searchButtonPressed = () => {
    onSearch(id, categoria, nome, marca);
  };

  return (
    <div className='container'>
      <div className='row'>
        <h2 className={styles.green}>Search Itens</h2>
        <div className='col'>
          <label>Id: </label>
          <input
            id="id-field"
            className='form-control'
            type="number"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </div>
        <div className='col'>
          <label>Categoria: </label>
          <input
            id="categoria-field"
            className='form-control'
            type="text"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
          />
        </div>
        <div className='col'>
          <label>Nome: </label>
          <input
            id="nome-field"
            className='form-control'
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </div>
        <div className='col'>
          <label>Marca: </label>
          <input
            id="marca-field"
            className='form-control'
            type="text"
            value={marca}
            onChange={(e) => setMarca(e.target.value)}
          />
        </div>
        <div className='row'>
          <div className='col-4' />
          <button
            type="button"
            className="btn btn-dark col-5 mt-3"
            onClick={searchButtonPressed}
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchItems;
