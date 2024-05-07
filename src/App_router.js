import './App.css';
import { Link } from 'react-router-dom';

import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <nav>
        <Link to="/">Home</Link>
        <Link to="/itens">Itens</Link>
        <Link to="/login">Login</Link>        
        <Link to="/cadastrar">Cadastrar</Link>        
        <Link to="/contact">Contato</Link>
        <Link to="/logout">Logout</Link> 
      </nav>
    <Outlet/>
    </div>
  );
}

export default App;