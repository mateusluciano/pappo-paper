import '../../styles/colorPickerAndIcons.css';
import '../../styles/form.css'

export function IconModal({ icons, selectedIcon, onSelect, onClose }) {
  return (
    <div className="modalOverlay" onClick={onClose}>
      <div className="modalContent" onClick={(e) => e.stopPropagation()}>
        <h3>Todos os ícones</h3>
        <div className="iconGrid">
          {icons.map((icon) => (
            <img
              key={icon.name}
              src={icon.src}
              alt={icon.name}
              className={`iconSelectable ${selectedIcon === icon.name ? 'selected' : ''}`}
              onClick={() => {
                onSelect(icon.name);
                onClose();
              }}
            />
          ))}
        </div>
        <button className="closeModal" onClick={onClose}>Fechar</button>
      </div>
    </div>
  );
}
