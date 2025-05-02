import { Link } from 'react-router-dom';
import '../styles/category.css';


export function Category({ titulo, url, link, classe, preco }) {
  const imageSrc = url
    ? `http://localhost:3001${url}`
    : `http://localhost:3001/uploads/produtos/base.png`;

  return (
    <Link to={link} className={classe}>
      <img className="imgCategory" src={imageSrc} alt={titulo} />
      <h3 className="textCategory">{titulo}</h3>
      <p className="textPrice">R$ {preco}</p>
    </Link>
  );
}
