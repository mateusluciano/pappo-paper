import { useState, useEffect, useRef } from 'react';
import { useDebouncedValue } from '../hooks/useDebouncedValue';

export function InputBuscaGenerica({
  tipo = 'instantaneo', // 'instantaneo' ou 'filtro'
  campoBusca = 'nome',
  placeholder = 'Buscar...',
  largura = 'input-medium',
  value,
  onSelect,
  onClear,
  onInputChange,
  apiURL = 'http://localhost:3001/api/produtos'
}) {
  const [busca, setBusca] = useState(value || '');
  const [sugestoes, setSugestoes] = useState([]);
  const debouncedBusca = useDebouncedValue(busca, 300);
  const ignoreNextFetch = useRef(false);

  useEffect(() => {
    ignoreNextFetch.current = true;
    setBusca(value || '');
  }, [value]);

  useEffect(() => {
    if (tipo !== 'instantaneo') return;

    if (ignoreNextFetch.current) {
      ignoreNextFetch.current = false;
      return;
    }

    if (debouncedBusca.trim().length >= 2) {
      fetch(`${apiURL}?${campoBusca}=${encodeURIComponent(debouncedBusca)}`)
        .then(res => res.json())
        .then(data => setSugestoes(data))
        .catch(err => console.error('Erro na busca:', err));
    } else {
      setSugestoes([]);
      if (debouncedBusca.trim() === '' && typeof onClear === 'function') {
        onClear();
      }
    }
  }, [debouncedBusca, campoBusca, apiURL, tipo]);

  const handleSelect = (item) => {
    ignoreNextFetch.current = true;
    setBusca(item[campoBusca]);
    setSugestoes([]);
    if (typeof onSelect === 'function') onSelect(item);
  };

  return (
    <div>
      <input
        className={`inputForm ${largura}`}
        type="text"
        placeholder={placeholder}
        value={busca}
        onChange={(e) => {
          const valor = e.target.value;
          setBusca(valor);
          if (typeof onInputChange === 'function') onInputChange(valor);
        }}
      />
      {tipo === 'instantaneo' && sugestoes.length > 0 && (
        <ul>
          {sugestoes.map((item) => (
            <li key={item.id} onClick={() => handleSelect(item)}>
              {item[campoBusca]}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
