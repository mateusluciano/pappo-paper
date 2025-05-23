import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from '../components/layout/layout';
import Home from './Home'; 
import Admin from './Admin';
import AddProduct from './AddProducts';
import AddCategory from './AddCategory';
import ManagerProducts from './ManagerProducts';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
        <Route path="/admin" element={<Admin />} />
        <Route path="/adicionar-produtos" element={<AddProduct />} />
        <Route path="/adicionar-categorias" element={<AddCategory />} />
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/adicionar-produtos" element={<AddProduct />} />
        <Route path="/adicionar-categorias" element={<AddCategory />} />
        <Route path="/gerenciar-produtos" element={<ManagerProducts />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
