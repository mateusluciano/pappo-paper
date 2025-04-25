import '../styles/category.css';

export function Category({ titulo, url }) {
    const image = new URL(`../assets/images/${url}`, import.meta.url).href;
  
    return (
      <div className="category">
        <img className='imgCategory' src={image} alt={titulo} />
        <h3 className='textCategory'>{titulo}</h3>
      </div>
    );
  }
  