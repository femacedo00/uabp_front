import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';


function App() {
  const [count, setCount] = useState(0)


  useEffect(() => {
    console.log('Executa Sempre')
  })

  useEffect(() => {
    console.log('Executa na primeira vez que a página carrega')
  }, [])  


  return (
    <div className="App">    
      <p> Foi renderizado: {count} </p>
      <button onClick={() => setCount((count) => count + 1)}>Contar</button>

    </div>
  );
}

export default App;