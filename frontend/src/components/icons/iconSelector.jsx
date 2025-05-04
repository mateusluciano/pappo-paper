import { IconModal } from './iconModal';
import '../../styles/colorPickerAndIcons.css';

export function IconSelector({ icons, selected, onSelect, showModal, setShowModal }) {
    const maxVisible = 4;
    const selectedIndex = icons.findIndex((i) => i.name === selected);
    const visibleIcons =
      selectedIndex >= maxVisible
        ? [...icons.slice(0, maxVisible - 1), icons[selectedIndex]]
        : icons.slice(0, maxVisible);
  
    const hiddenIcons = icons.filter((icon) => !visibleIcons.includes(icon));
  
    return (
      <div className="iconGrid">
        {visibleIcons.map((icon) => (
          <img
            key={icon.name}
            src={icon.src}
            alt={icon.name}
            className={`iconSelectable ${selected === icon.name ? 'selected' : ''}`}
            onClick={() => onSelect(icon.name)}
          />
        ))}
        <button className="seeMoreButton" type="button" onClick={() => setShowModal(true)}>+ mais</button>
        {showModal && (
          <IconModal
            icons={hiddenIcons}
            selectedIcon={selected}
            onSelect={onSelect}
            onClose={() => setShowModal(false)}
          />
        )}
      </div>
    );
  }
  