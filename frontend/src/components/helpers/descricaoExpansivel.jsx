import '../../styles/form.css';
import { useState, useEffect } from 'react';

export function DescricaoExpandivel({ descricao, setDescricao }) {
    const [expandir, setExpandir] = useState(false);
  
    return (
      <div className='inputFormDescricao'>
        {!expandir ? (
          <p onClick={() => setExpandir(true)}>
            {descricao || "Clique para adicionar uma descrição"}
          </p>
        ) : (
          <textarea
            className="inputForm"
            placeholder="Descrição do Produto"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            rows="5"
          />
        )}
      </div>
    );
  }
  