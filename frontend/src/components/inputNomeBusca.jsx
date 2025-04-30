import { useState, useEffect, useRef } from 'react';
import { useDebouncedValue } from '../hooks/useDebouncedValue';

export function InputNomeProduto({ value, onSelect }) {
  const [busca, setBusca] = useState(value);
  const [sugestoes, setSugestoes] = useState([]);
  const debouncedBusca = useDebouncedValue(busca, 300);
  const ignoreNextFetch = useRef(false);

  // sincroniza com valor externo
  useEffect(() => {
    setBusca(value);
  }, [value]);

  useEffect(() => {
    if (ignoreNextFetch.current) {
      ignoreNextFetch.current = false; // cancela uma execução do fetch
      return;
    }

    if (debouncedBusca.length >= 2) {
      fetch(`http://localhost:3001/api/produtos?nome=${encodeURIComponent(debouncedBusca)}`)
        .then(res => res.json())
        .then(data => setSugestoes(data))
        .catch(err => console.error('Erro na busca:', err));
    } else {
      setSugestoes([]);
    }
  }, [debouncedBusca]);

  const handleSelect = (produto) => {
    ignoreNextFetch.current = true;     // cancela a próxima execução do efeito
    onSelect(produto);
    setBusca(produto.nome);
    setSugestoes([]);
  };

  return (
    <div className="inputProdutoComBusca" style={{ position: 'relative' }}>
      <input
        className="inputForm input-xxlarge"
        type="text"
        placeholder="Nome do Produto"
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
        onBlur={() => setTimeout(() => setSugestoes([]), 100)}
      />
      {sugestoes.length > 0 && (
        <ul className="sugestoesProduto" style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          zIndex: 10,
          background: '#fff',
          listStyle: 'none',
          padding: 0,
          margin: 0,
          border: '1px solid #ccc'
        }}>
          {sugestoes.map((p) => (
            <li
              key={p.id}
              style={{ padding: '8px', cursor: 'pointer' }}
              onClick={() => handleSelect(p)}
            >
              {p.nome}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
