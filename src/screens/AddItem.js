import { useState } from 'react';
import axios from 'axios';

function AddItems(props){

    const [upc_a, setUpc_a] = useState(0)
    const [nome, setNome] = useState("")
    const [categoria, setCategoria] = useState("")
    const [marca, setMarca] = useState("")
    const [uni_grand, setUni_grand] = useState("")
    const [num_grand, setNum_grand] = useState(0)

    const addItemsButtonPressed = async () => {
      const itemData = {
        "upc_a": parseInt(upc_a),
        "nome": nome,
        "categoria": parseInt(categoria),
        "marca": marca,
        "uni_grand": uni_grand,
        "num_grand": parseInt(num_grand)
      };

      const token = localStorage.getItem("token");

      try {
          const response = await axios.post(
            'http://localhost:8080/v1/item/', 
            itemData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          console.log(response);
      } catch (error) {
          console.error("There was an error adding the item:", error);
      }
    }

  return (
    <div>
      <div className='container'>
        <div className='row'>
          <h2>Add Items</h2>
        </div>
        <div className='row'>
          <label>Upc_a: </label>
          <input id="upc_a-field" className='form-control' type="number" value={upc_a} onChange={ (e) => setUpc_a(e.target.value) }/>
        </div>          
        <div className='row'>
          <label>Nome: </label>
          <input id="nome-field" className='form-control' type="text" value={nome} onChange={ (e) => setNome(e.target.value) }/>
        </div>
        <div className='row'>
          <label>Número de grandeza: </label>
          <select id="categoria-field" className='form-control'  value={categoria} onChange={ (e) => setCategoria(e.target.value) }>
            <option key={1} value={1}>Açougue</option>
            <option key={2} value={2}>Frios e laticínios</option>
            <option key={3} value={3}>Adega e bebidas</option>
            <option key={4} value={4}>Higiene e limpeza</option>
            <option key={5} value={5}>Hortifruti e mercearia</option>
            <option key={6} value={6}>Padaria</option>
            <option key={7} value={7}>Enlatados</option>
            <option key={8} value={8}>Enlatados</option>
            <option key={9} value={9}>Rotisseria</option>
          </select>
        </div>       
        <div className='row'>
          <label>Marca: </label>
          <input id="marca-field" className='form-control' type="text" value={marca} onChange={ (e) => setMarca(e.target.value) }/>
        </div>
        <div className='row'>
          <label>Unidade de grandeza: </label>
          <input id="uni_grand-field" className='form-control' type="text" value={uni_grand} onChange={ (e) => setUni_grand(e.target.value) }/>      
        </div>   
        <div className='row'>
          <label>Número de grandeza: </label>
          <input id="num_grand-field" className='form-control' type="number" value={num_grand} onChange={ (e) => setNum_grand(e.target.value) }/>      
        </div>        
        <div className='row'>
          <button type="button" className='btn btn-dark mt-3' onClick={addItemsButtonPressed}>Add</button>
        </div>
      </div>
    </div>
  )
}

export default AddItems;