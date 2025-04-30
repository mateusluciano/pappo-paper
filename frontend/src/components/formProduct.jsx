import '../styles/form.css';
import { useState, useEffect } from 'react';
import { CategoriaSelect } from './categoriaSelect';
import { InputPreco } from './inputPreco';
import { InputImagem } from './inputImagem';
import { DescricaoExpandivel } from './descricaoExpansivel';
import { InputNomeProduto } from './inputNomeProduto';

export function MeuFormulario() {
  const [form, setForm] = useState({
    nome: '',
    categoria: '',
    cBarra: '',
    cSis: '',
    precoCompra: '',
    precoVenda: '',
    estoque: '',
    estoqueAtual: '',
    descricao: '',
    imageFile: null,
    imageURL: '',
    ativo: true,
  });

  const [categorias, setCategorias] = useState([]);
  const [estoqueAtual] = useState(0); // Suponha que virá do banco

  useEffect(() => {
    fetch('http://localhost:3001/api/categorias')
      .then((res) => res.json())
      .then((data) => setCategorias(data))
      .catch((err) => {
        console.error('Erro ao carregar categorias:', err);
        alert('Erro ao carregar categorias do banco.');
      });
  }, []);
  

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    for (const key in form) {
      if (key !== 'imageURL' && key !== 'imageFile') {
        formData.append(key, form[key]);
      }
    }
    if (form.imageFile) {
      formData.append('imagem', form.imageFile);
    }
    
  
    try {
      const response = await fetch('http://localhost:3001/api/produtos', {
        method: 'POST',
        body: formData
      });
  
      if (!response.ok) throw new Error(`Erro: ${response.status}`);
  
      const data = await response.json();
      console.log('Produto cadastrado:', data);
      alert('Produto cadastrado com sucesso!');

      setForm({
        nome: '',
        categoria: '',
        cBarra: '',
        cSis: '',
        precoCompra: '',
        precoVenda: '',
        estoque: '',
        descricao: '',
        imageFile: null,
        imageURL: '',
        ativo: true
      });
      
    } catch (error) {
      console.error('Erro ao enviar:', error);
      alert('Erro ao cadastrar. Tente novamente.');
    }
  };
  

  const atualizarCampo = (campo, valor) => {
    setForm((prev) => ({ ...prev, [campo]: valor }));
  };

  return (
    <form onSubmit={handleSubmit} className="dynamicForm">
      <InputNomeProduto
      value={form.nome}
      onSelect={(produto) => {
        atualizarCampo('nome', produto.nome);
        atualizarCampo('cBarra', produto.cBarra);
        atualizarCampo('cSis', produto.cSis);             // ✅ Código interno
        atualizarCampo('categoria', produto.categoria);   // ✅ Categoria
        atualizarCampo('estoqueAtual', produto.estoque);       // ✅ Estoque atual (se vier com esse nome)
        atualizarCampo('precoVenda', produto.precoVenda);
        atualizarCampo('descricao', produto.descricao);
      }}
/>


      <CategoriaSelect  categorias={categorias}
        value={form.categoria}
        onChange={(value) => atualizarCampo('categoria', value)} />

      <input className="inputForm input-xxlarge" type="number" placeholder="Código de Barras"
        value={form.cBarra} onChange={(e) => atualizarCampo('cBarra', e.target.value)} />

      <input className="inputForm input-micro" type="text" placeholder="Código Interno"
        value={form.cSis} onChange={(e) => atualizarCampo('cSis', e.target.value)} />

      <InputPreco placeholder="Preço de Compra"
        value={form.precoCompra} onChange={(valor) => atualizarCampo('precoCompra', valor)} />

      <InputPreco placeholder="Preço de Venda"
        value={form.precoVenda} onChange={(valor) => atualizarCampo('precoVenda', valor)} />

      <input className="inputForm input-micro" type="number" placeholder="Quantidade"
        value={form.estoque} onChange={(e) => atualizarCampo('estoque', e.target.value)} />

      <input
        className="inputForm input-micro"
        type="text"
        disabled
        value={`QT Atual: ${form.estoqueAtual}`}
      />


      <InputImagem
        imageURL={form.imageURL}
        setImageURL={(url) => atualizarCampo('imageURL', url)}
        setImageFile={(file) => atualizarCampo('imageFile', file)}
      />


      <DescricaoExpandivel descricao={form.descricao} setDescricao={(desc) => atualizarCampo('descricao', desc)} />

      <button className="btSubmit" type="submit">Adicionar</button>
      <button className="btSubmit btSubmit-secondary" type="button" onClick={() => {
        atualizarCampo('ativo', true);
        handleSubmit({ preventDefault: () => {} });
      }}>Adicionar e Ativar</button>
    </form>
  );
}
