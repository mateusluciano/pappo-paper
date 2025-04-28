import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home'; 
import Admin from './Admin';
import AddProduct from './AddProducts';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/adicionar-produtos" element={<AddProduct />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
