import '../../styles/form.css';
import '../../styles/colorPickerAndIcons.css';
import { useState } from 'react';
import { ColorPicker } from '../helpers/colorPicker';
import { IconSelector } from '../icons/iconSelector';

const icons = import.meta.glob('../assets/icons/*.svg', { eager: true });
const iconEntries = Object.entries(icons).map(([path, mod]) => ({
  name: path.split('/').pop(),
  src: mod.default
}));

const colorOptions = {
  vermelho: ['#FFCDD2', '#EF9A9A', '#E57373', '#EF5350', '#F44336', '#E53935', '#D32F2F'],
  laranja:  ['#FFE0B2', '#FFCC80', '#FFB74D', '#FFA726', '#FF9800', '#FB8C00', '#F57C00'],
  amarelo:  ['#FFF9C4', '#FFF59D', '#FFF176', '#FFEE58', '#FFEB3B', '#FDD835', '#FBC02D'],
  azul:     ['#BBDEFB', '#90CAF9', '#64B5F6', '#42A5F5', '#2196F3', '#1E88E5', '#1976D2'],
  verde:    ['#C8E6C9', '#A5D6A7', '#81C784', '#66BB6A', '#4CAF50', '#43A047', '#388E3C'],
  roxo:     ['#E1BEE7', '#CE93D8', '#BA68C8', '#AB47BC', '#9C27B0', '#8E24AA', '#7B1FA2'],
  preto:    ['#FAFAFA', '#F5F5F5', '#E0E0E0', '#9E9E9E', '#616161', '#424242', '#212121'],
};

export function MeuFormulario() {
  const [form, setForm] = useState({
    nome: '',
    cor: '',
    cIcon: '',
    cSisBar: '',
    descricao: '',
    ordem: ''
  });

  const [expandirDescricao, setExpandirDescricao] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [baseColor, setBaseColor] = useState('');
  const [selectedColor, setSelectedColor] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://localhost:3001/api/categorias', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      });
  
      if (!response.ok) {
        throw new Error(`Erro: ${response.status}`);
      }
  
      const data = await response.json();
      console.log('Resposta do servidor:', data);
      alert('Categoria cadastrada com sucesso!');
      
      // (Opcional) resetar o formulário:
      setForm({ nome: '', cor: '', cIcon: '', cSisBar: '', descricao: '', ordem: '' });
  
    } catch (error) {
      console.error('Erro ao enviar:', error);
      alert('Erro ao cadastrar. Tente novamente.');
    }
  };
  

  return (
    <form onSubmit={handleSubmit} className="dynamicForm">
      <input
        className='inputForm input-xxlarge'
        type="text"
        name="nome"
        placeholder="Nome da Categoria"
        value={form.nome}
        onChange={handleChange}
      />

      <input
        className='inputForm input-micro'
        type="number"
        name="cSisBar"
        placeholder="Código da Categoria"
        value={form.cSisBar}
        onChange={handleChange}
      />


      <IconSelector
        icons={iconEntries}
        selected={form.cIcon}
        onSelect={(icon) => setForm((prev) => ({ ...prev, cIcon: icon }))}
        showModal={showModal}
        setShowModal={setShowModal}
      />
      
      <ColorPicker
        baseColor={baseColor}
        selectedColor={selectedColor}
        onBaseClick={(color) => setBaseColor(color)}
        onToneClick={(tone) => {
          setSelectedColor(tone);
          setForm((prev) => ({ ...prev, cor: tone }));
        }}
        options={colorOptions}
      />

      <div id='inputFormDescricao' className='inputFormDescricao'>
        {!expandirDescricao ? (
          <p id='inputTextarea' onClick={() => setExpandirDescricao(true)}>
            {form.descricao || "Clique para adicionar uma descrição"}
          </p>
        ) : (
          <textarea
            className="inputForm"
            id='inputTextarea2'
            name="descricao"
            placeholder="Descrição da Categoria"
            value={form.descricao}
            onChange={handleChange}
            rows="5"
          />
        )}
      </div>

      <button className='btSubmit' type="submit">
        Cadastrar Categoria
      </button>
    </form>
  );
}
