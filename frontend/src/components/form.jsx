
import '../styles/form.css'; // Seu CSS
import { useState } from 'react';

export function MeuFormulario() {
  // Estado para armazenar o valor dos campos
  const [nome, setNome] = useState('');
  const [categoria, setCategoria] = useState('');
  const [cBarra, setcBarra] = useState('');
  const [precoCompra, setPrecoCompra] = useState('');
  const [precoVenda, setPrecoVenda] = useState('');
  const [estoque, setEstoque] = useState('');
  const [descricao, setDescricao] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [expandirDescricao, setExpandirDescricao] = useState(false); // Estado para controlar a expansão da descrição
  const [ativo, setAtivo] = useState(true);
  

  const [estoqueAtual, setEstoqueAtual] = useState(0); // Estado para o estoque atual


  // Função para lidar com o envio do formulário
  const handleSubmit = (e) => {
    e.preventDefault(); // Impede o recarregamento da página
    console.log('Dados enviados:', { nome, categoria, cBarras, precoCompra, precoVenda, estoque, descricao, imageURL, ativo });
    // Aqui você pode fazer, por exemplo, um fetch para enviar os dados a um servidor
  };


   // Função para formatar valor em reais (pode ser usada nos dois inputs de preço)
   const formatarValor = (valor) => {
    valor = valor.replace(/\D/g, '');

    if (valor.length === 0) {
      valor = '0';
    }

    const valorNumerico = parseFloat(valor) / 100;

    return valorNumerico.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImageURL(imageUrl);
    }
  };
  


  return (
    <form onSubmit={handleSubmit} className="dynamicForm">
      <div >
        <input id='inputForm60' className='inputForm' type="text" placeholder='Nome do Produto'
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        />
      </div>

    
        <select id='inputFormSelect' className='inputForm' value={categoria} onChange={(e) => setCategoria(e.target.value)}>
            <option value="">Categoria</option>
            <option value="cadernos">Cadernos</option>
            <option value="decor">Decoração</option>
            <option value="org">Organização</option>
            <option value="ades">Adesivos</option>
        </select>
    

      
        <input id='inputForm100' className='inputForm'
        type='number' placeholder='Código de Barras do Produto'
        value={cBarra}
        onChange={(e) => setcBarra(e.target.value)}
        />

              {/* Input de Preço de Compra */}
      <div style={{ position: 'relative' }}>
        <span className="prefixo-reais">R$</span>
        <input
          id='inputForm30'
          className='inputForm'
          type='text'
          placeholder='Preço de Compra'
          value={precoCompra}
          onChange={(e) => setPrecoCompra(formatarValor(e.target.value))}
          inputMode="numeric"
          style={{ paddingLeft: '30px' }}
        />
      </div>

      {/* Input de Preço de Venda */}
      <div style={{ position: 'relative' }}>
        <span className="prefixo-reais">R$</span>
        <input
          id='inputForm30'
          className='inputForm'
          type='text'
          placeholder='Preço de Venda'
          value={precoVenda}
          onChange={(e) => setPrecoVenda(formatarValor(e.target.value))}
          inputMode="numeric"
          style={{ paddingLeft: '30px' }}
        />
      </div>

      <input
        id='inputForm50'
        className='inputForm'
        type='number'
        placeholder='Quantidade'
        value={estoque}
        onChange={(e) => setEstoque(e.target.value)}
      />


      <input
        id='inputForm30'
        className='inputForm'
        type='text'
        value={`Estoque Atual: ${estoqueAtual}`}
        disabled
      />

      
      {/* Upload da Imagem */}
      <input
        id='inputForm100'
        className='inputForm'
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
      />

    
      {/* Mostrando imagem enviada (se tiver) */}
      {imageURL && (
        <div style={{ marginTop: '10px' }}>
          <img src={imageURL} alt="Preview" style={{ maxWidth: '280px' }} />
        </div>
      )}

    <div id='inputFormDescricao' className='inputFormDescricao'>
    {!expandirDescricao ? (
        <p id='inputTextarea'
        onClick={() => setExpandirDescricao(true)}
        >
        {descricao || "Clique para adicionar uma descrição"}
        </p>
    ) : (
        <textarea
        className="inputForm" id='inputTextarea2'
        placeholder="Descrição do Produto"
        value={descricao}
        onChange={(e) => setDescricao(e.target.value)}
        rows="5"
        />
    )}
    </div>



    

      <button className='btSubmit' id='btSubmit' type="submit">Cadastrar</button>
      <button className='btSubmit' id='btSubmit2' type="submit">Cadastrar e Ativar</button>
    </form>
  );
}