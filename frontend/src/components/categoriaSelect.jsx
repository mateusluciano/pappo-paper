export function CategoriaSelect({ categorias, value, onChange }) {
    return (
      <select className="inputForm input-micro" value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="">Categoria</option>
        {categorias.map((cat) => (
          <option key={cat.id} value={cat.nome}>{cat.nome}</option>
        ))}
      </select>
    );
  }
  