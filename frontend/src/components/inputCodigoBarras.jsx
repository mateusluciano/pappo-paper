import { useState, useEffect, useRef } from 'react';
import { useDebouncedValue } from '../hooks/useDebouncedValue';

export function InputCodigoBarras({ value, onSelect, onClear, onInputChange }) {
  const [codigo, setCodigo] = useState(value || '');
  const [sugestoes, setSugestoes] = useState([]);
  const debouncedCodigo = useDebouncedValue(codigo, 300);
  const ignoreNextFetch = useRef(false);

  useEffect(() => {
    setCodigo(value);
  }, [value]);

  useEffect(() => {
    if (ignoreNextFetch.current) {
      ignoreNextFetch.current = false;
      return;
    }

    if (debouncedCodigo.trim().length >= 8) {
      fetch(`http://localhost:3001/api/produtos?cBarra=${encodeURIComponent(debouncedCodigo)}`)
        .then(res => res.json())
        .then(data => setSugestoes(data))
        .catch(err => console.error('Erro na busca:', err));
    } else {
      setSugestoes([]);
      if (debouncedCodigo.trim() === '' && typeof onClear === 'function') {
        onClear();
      }
    }
  }, [debouncedCodigo]);

  const handleSelect = (produto) => {
    ignoreNextFetch.current = true;
    setCodigo(produto.cBarra);
    setSugestoes([]);
    if (typeof onSelect === 'function') onSelect(produto);
  };

  return (
    <div>
      <input
        className="inputForm input-xxlarge"
        type="text"
        placeholder="Código de Barras"
        value={codigo}
        onChange={(e) => {
          const valor = e.target.value;
          setCodigo(valor);
          if (typeof onInputChange === 'function') {
            onInputChange(valor);
          }
        }}
      />
      {sugestoes.length > 0 && (
        <ul>
          {sugestoes.map((p) => (
            <li key={p.id} onClick={() => handleSelect(p)}>
              {p.cBarra} - {p.nome}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
