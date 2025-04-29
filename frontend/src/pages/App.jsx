import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home'; 
import Admin from './Admin';
import AddProduct from './AddProducts';
import AddCategory from './AddCategory';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/adicionar-produtos" element={<AddProduct />} />
        <Route path="/adicionar-categorias" element={<AddCategory />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
