import '../styles/form.css'; // Seu CSS
import '../styles/colorPickerAndIcons.css'; // CSS para o seletor de cores
import { useState } from 'react';
import { IconModal } from './iconModal'; // importe o novo componente



const icons = import.meta.glob('../assets/icons/*.svg', { eager: true });
const iconEntries = Object.entries(icons).map(([path, mod]) => {
  const fileName = path.split('/').pop(); // Extrai só o nome do arquivo
  return { name: fileName, src: mod.default };
});






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
  // Estado para armazenar o valor dos campos
  const [nome, setNome] = useState('');
  const [cor, setCor] = useState('');
  const [cIcon, setcIcon] = useState('');
  const [cSisBar, setcSisBar] = useState('');
  const [descricao, setDescricao] = useState('');
  const [ordem, setOrdem] = useState('');
  const [expandirDescricao, setExpandirDescricao] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const maxVisible = 4;
  const selectedIndex = iconEntries.findIndex((i) => i.name === cIcon);
  const visibleIcons =
    selectedIndex >= 0 && selectedIndex >= maxVisible
      ? [...iconEntries.slice(0, maxVisible - 1), iconEntries[selectedIndex]]
      : iconEntries.slice(0, maxVisible);

  const hiddenIcons = iconEntries.filter((icon) => !visibleIcons.includes(icon));


  // Função para lidar com o envio do formulário
  const handleSubmit = (e) => {
    e.preventDefault(); // Impede o recarregamento da página
    console.log('Dados enviados:', { nome, categoria, cBarras, precoCompra, precoVenda, estoque, descricao, imageURL, ativo });
    // Aqui você pode fazer, por exemplo, um fetch para enviar os dados a um servidor
  };

  const [baseColor, setBaseColor] = useState('');
  const [selectedColor, setSelectedColor] = useState('');

  const handleBaseClick = (color) => {
    setBaseColor(color);
  };

  const handleToneClick = (tone) => {
    setSelectedColor(tone);
    setCor(tone);
  };
  


  return (
    <form onSubmit={handleSubmit} className="dynamicForm">
      <div >
        <input id='inputForm70' className='inputForm' type="text" placeholder='Nome da Categoria'
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        />
      </div>

      
        <input id='inputForm20' className='inputForm'
        type='number' placeholder='Código da Categoria'
        value={cSisBar}
        onChange={(e) => setcSisBar(e.target.value)}Disable
        />


        <div className="colorPicker">
      <div className="baseColors">
        {Object.keys(colorOptions).map((color) => (
          <div
            key={color}
            className="colorCircle"
            style={{ backgroundColor: colorOptions[color][4] }}
            onClick={() => handleBaseClick(color)}
          />
        ))}
      </div>

      {baseColor && (
        <div className="toneColors">
          {colorOptions[baseColor].map((tone) => (
            <div
              key={tone}
              className={`colorCircle ${selectedColor === tone ? 'selected' : ''}`}
              style={{ backgroundColor: tone }}
              onClick={() => handleToneClick(tone)}
            />
          ))}
        </div>
      )}
    </div>


    <div className="iconGrid">
      {visibleIcons.map((icon) => (
      <img
        key={icon.name}
        src={icon.src}
        alt={icon.name}
        className={`iconSelectable ${cIcon === icon.name ? 'selected' : ''}`}
        onClick={() => setcIcon(icon.name)}
      />
      ))}

    <button
      className="seeMoreButton"
      type="button"
      title="Ver mais ícones"
      onClick={() => setShowModal(true)} // ✅ necessário!
    >
      + mais
    </button>

      {showModal && (
        <IconModal
          icons={hiddenIcons}
          selectedIcon={cIcon}
          onSelect={(icon) => setcIcon(icon)}
          onClose={() => setShowModal(false)} // ✅ necessário!
        />
      )}
    </div>
    






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
        placeholder="Descrição da Categoria"
        value={descricao}
        onChange={(e) => setDescricao(e.target.value)}
        rows="5"
        />
    )}
    </div>



    

      <button className='btSubmit' id='btSubmit3' type="submit">Cadastrar Categoria</button>
    </form>
  );
}