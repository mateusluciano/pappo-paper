import '../../styles/form.css';
import { useState, useEffect } from 'react';
import { CategoriaSelect } from '../category and cards/categoriaSelect';
import { InputPreco } from '../inputBuscas/inputPreco';
import { InputImagem } from '../inputBuscas/inputImagem';
import { DescricaoExpandivel } from '../helpers/descricaoExpansivel';
import { InputNomeProduto } from '../inputBuscas/inputNomeBusca';
import { InputCodigoBarras } from '../inputBuscas/inputCodigoBarras';

export function MeuFormulario() {
  const [form, setForm] = useState({
    id: null,
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

  const [nomeOriginal, setNomeOriginal] = useState('');


  

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

  useEffect(() => {
    if (form.nome.trim() === '') {
      atualizarCampo('id', null);
      atualizarCampo('estoqueAtual', '');
    }
  }, [form.nome]);
  
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isNumero = (v) => !isNaN(parseFloat(v)) && isFinite(v);

    if (
      !form.categoria ||
      !form.precoCompra ||
      !form.precoVenda ||
      !form.estoque ||
      !form.cSis
    ) {
      alert('Preencha os campos obrigatórios: preço de compra, preço de venda, quantidade e código interno.');
      return;
    }
    
    
  
    const formData = new FormData();
    for (const key in form) {
      if (key !== 'imageURL' && key !== 'imageFile' && key !== 'estoqueAtual') {
        formData.append(key, form[key]);
      }
    }
  
    if (form.imageFile) {
      formData.append('imagem', form.imageFile);
    }
  
    try {
      let response;
  
      if (form.id) {
        // Atualização: soma a quantidade nova ao estoque atual
        const novaQuantidade = Number(form.estoque) + Number(form.estoqueAtual);
        formData.set('estoque', novaQuantidade);
  
        response = await fetch(`http://localhost:3001/api/produtos/${form.id}`, {
          method: 'PUT',
          body: formData
        });
      } else {
        response = await fetch('http://localhost:3001/api/produtos', {
          method: 'POST',
          body: formData
        });
      }
  
      if (!response.ok) throw new Error(`Erro: ${response.status}`);
  
      const data = await response.json();
      alert(form.id ? 'Produto atualizado com sucesso!' : 'Produto cadastrado com sucesso!');
  
      // Reset
      setForm({
        id: null,
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
        ativo: true
      });
    } catch (error) {
      console.error('Erro ao enviar:', error);
      alert('Erro ao salvar produto.');
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
          setNomeOriginal(produto.nome);
          atualizarCampo('id', produto.id);
          atualizarCampo('nome', produto.nome);
          atualizarCampo('cBarra', produto.cBarra);
          atualizarCampo('cSis', produto.cSis);
          atualizarCampo('categoria', produto.categoria);
          atualizarCampo('estoqueAtual', produto.estoque);
          atualizarCampo('precoVenda', produto.precoVenda);
          atualizarCampo('descricao', produto.descricao);
        }}
        onClear={() => {
          atualizarCampo('id', null);
          atualizarCampo('cBarra', '');
          atualizarCampo('cSis', '');
          atualizarCampo('categoria', '');
          atualizarCampo('estoqueAtual', '');
          setNomeOriginal('');
        }}
        onInputChange={(valor) => {
          atualizarCampo('nome', valor);
          if (form.id && valor !== nomeOriginal) {
            atualizarCampo('id', null);
            atualizarCampo('cBarra', '');
            atualizarCampo('cSis', '');
            atualizarCampo('categoria', '');
            atualizarCampo('estoqueAtual', '');
            setNomeOriginal('');
          }
        }}
      />




      <CategoriaSelect
        categorias={categorias}
        value={form.categoria}
        onChange={(value) => atualizarCampo('categoria', value)}
        disabled={!!form.id}
      />

      <InputCodigoBarras
        value={form.cBarra}
        onInputChange={(val) => atualizarCampo('cBarra', val)}
        onSelect={(produto) => {
          setNomeOriginal(produto.nome); // necessário para preservar lógica do nome
          atualizarCampo('id', produto.id);
          atualizarCampo('nome', produto.nome);
          atualizarCampo('cBarra', produto.cBarra);
          atualizarCampo('cSis', produto.cSis);
          atualizarCampo('categoria', produto.categoria);
          atualizarCampo('estoqueAtual', produto.estoque);
          atualizarCampo('precoVenda', produto.precoVenda);
          atualizarCampo('descricao', produto.descricao);
        }}
        onClear={() => atualizarCampo('cBarra', '')}
      />



      <input
        className={`inputForm input-micro ${form.id ? 'input-block' : ''}`}
        type="text"
        placeholder="Código Interno"
        value={form.cSis}
        onChange={(e) => atualizarCampo('cSis', e.target.value)}
        disabled={!!form.id}
      />

      <InputPreco placeholder="Preço de Compra"
        value={form.precoCompra} onChange={(valor) => atualizarCampo('precoCompra', valor)} />

      <InputPreco placeholder="Preço de Venda"
        value={form.precoVenda} onChange={(valor) => atualizarCampo('precoVenda', valor)} />

      <input className="inputForm input-micro" type="number" placeholder="Quantidade"
        value={form.estoque} onChange={(e) => atualizarCampo('estoque', e.target.value)} />

      <input
        className="inputForm input-micro input-block"
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
