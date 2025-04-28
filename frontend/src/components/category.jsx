import { Link } from 'react-router-dom';
import '../styles/category.css';


export function Category({ titulo, url, link }) {
  const image = new URL(`../assets/images/${url}`, import.meta.url).href;

  return (
    <Link to={link} className="category">
      <img className='imgCategory' src={image} alt={titulo} />
      <h3 className='textCategory'>{titulo}</h3>
    </Link>
  );
}  