import React from 'react';
import './App.scss';
import EstoqueProdutosPage from '../src/pages/produtos/EstoqueProdutos';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure()
function App() {
  return (
    <div className="App">
      <div className="App_backgroundPage"></div>
      <EstoqueProdutosPage></EstoqueProdutosPage>
    </div>
  );
}

export default App;
