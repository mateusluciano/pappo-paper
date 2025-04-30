export function CategoriaSelect({ categorias, value, onChange, disabled = false }) {
  return (
    <select
      className={`inputForm input-micro ${disabled ? 'input-block' : ''}`}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
    >
      <option value="">Categoria</option>
      {categorias.map((cat) => (
        <option key={cat.id} value={cat.nome}>
          {cat.nome}
        </option>
      ))}
    </select>
  );
}

  