import '../../styles/colorPickerAndIcons.css';

export function ColorPicker({ baseColor, selectedColor, onBaseClick, onToneClick, options }) {
    return (
      <div className="colorPicker">
        <div className="baseColors">
          {Object.keys(options).map((color) => (
            <div
              key={color}
              className="colorCircle"
              style={{ backgroundColor: options[color][4] }}
              onClick={() => onBaseClick(color)}
            />
          ))}
        </div>
  
        {baseColor && (
          <div className="toneColors">
            {options[baseColor].map((tone) => (
              <div
                key={tone}
                className={`colorCircle ${selectedColor === tone ? 'selected' : ''}`}
                style={{ backgroundColor: tone }}
                onClick={() => onToneClick(tone)}
              />
            ))}
          </div>
        )}
      </div>
    );
  }
  