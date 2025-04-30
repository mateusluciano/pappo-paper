import { useState, useEffect, useRef } from 'react';
import { useDebouncedValue } from '../hooks/useDebouncedValue';

export function InputNomeProduto({ value, onSelect, onClear, onInputChange }) {
  const [busca, setBusca] = useState(value);
  const [sugestoes, setSugestoes] = useState([]);
  const debouncedBusca = useDebouncedValue(busca, 300);
  const ignoreNextFetch = useRef(false);

  useEffect(() => {
    setBusca(value);
  }, [value]);

  useEffect(() => {
    if (ignoreNextFetch.current) {
      ignoreNextFetch.current = false;
      return;
    }

    if (debouncedBusca.trim().length >= 2) {
      fetch(`http://localhost:3001/api/produtos?nome=${encodeURIComponent(debouncedBusca)}`)
        .then(res => res.json())
        .then(data => setSugestoes(data))
        .catch(err => console.error('Erro na busca:', err));
    } else {
      setSugestoes([]);
      if (debouncedBusca.trim() === '' && typeof onClear === 'function') {
        onClear();
      }
    }
  }, [debouncedBusca]);

  const handleSelect = (produto) => {
    ignoreNextFetch.current = true;
    setBusca(produto.nome);
    setSugestoes([]);
    onSelect(produto);
  };

  return (
    <div>
      <input
        className="inputForm input-xxlarge"
        type="text"
        placeholder="Nome do Produto"
        value={busca}
        onChange={(e) => {
          const valor = e.target.value;
          setBusca(valor);
          if (typeof onInputChange === 'function') {
            onInputChange(valor);
          }
        }}
      />
      {sugestoes.length > 0 && (
        <ul>
          {sugestoes.map((p) => (
            <li key={p.id} onClick={() => handleSelect(p)}>
              {p.nome}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
