import '../styles/menu.css';
import { useEffect, useState } from 'react';
import { Category } from './category';

export function MenuProdutos() {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/produtos')
      .then((res) => res.json())
      .then((data) => setProdutos(data))
      .catch((err) => console.error('Erro ao carregar produtos:', err));
  }, []);

  return (
    <div className="menuCategories">
      {produtos.map((produto) => (
        <Category
          key={produto.id}
          titulo={produto.nome}
          url={produto.imageURL || 'placeholder.png'}
          preco={produto.precoVenda}
          classe="product"
        />
      ))}
    </div>
  );
}
